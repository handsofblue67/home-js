import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import * as _ from 'lodash'
import * as io from 'socket.io-client'
import * as feathers from 'feathers-client'

import { AuthService } from '../auth.service'
import { UsersService } from '../users'

@Injectable()
export class ChatService {

  public messages$: Observable<any[]>
  private chatObserver: Observer<any[]>
  private feathersService: any
  private dataStore: { messages: any[] }

  // TODO: figure out how to not get a new token everytime a service is called...
  constructor(private authService: AuthService, private usersService: UsersService) {
    authService.getService('users').subscribe(feathersService => {
      this.feathersService = feathersService
      this.feathersService
        .on('created', user => this.onCreated(user))
        .on('updated', user => this.onUpdated(user))
        .on('removed', user => this.onRemoved(user))
      this.messages$ = <Observable<any[]>>new Observable(observer => this.chatObserver = observer).share()
      this.dataStore = { messages: [] }
      this.find()
    })
  }

  public find() {
    this.feathersService.find((err, messages: any[]) => {
      if (err) return console.error(err)
      this.dataStore.messages = messages
      this.chatObserver.next(this.dataStore.messages)
    })
  }

  private getIndex(id: string): number {
    return _.findIndex(this.dataStore.messages, message => message.id === id)
  }

  private onCreated(message: any) {
    this.dataStore.messages = [...this.dataStore.messages, message]
    this.chatObserver.next(this.dataStore.messages)
  }

  private onUpdated(message: any) {
    const index = this.getIndex(message.id)
    this.dataStore.messages[index] = message
    this.chatObserver.next(this.dataStore.messages)
  }

  private onRemoved(message: any) {
    this.dataStore.messages = _.without(this.dataStore.messages, message)
    this.chatObserver.next(this.dataStore.messages)
  }

  public create(message: any) {
    this.feathersService.create(message)
      .then(console.log())
  }

}
