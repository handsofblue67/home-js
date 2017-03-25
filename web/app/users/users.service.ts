import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import 'rxjs/add/operator/map'
import * as _ from 'lodash'
import * as io from 'socket.io-client'
import * as feathers from 'feathers-client'

import { AuthService } from '../auth.service'
import { User } from '../models'

@Injectable()
export class UsersService {

  public users$: Observable<User[]>
  private usersObserver: Observer<User[]>
  private feathersService: any
  private dataStore: { users: User[] }

  // TODO: figure out how to not get a new token everytime a service is called...
  constructor(private authService: AuthService) {
    this.dataStore = { users: [] }
    this.users$ = <Observable<User[]>>new Observable(observer => this.usersObserver = observer).share()

    // authService.auth$.subscribe(loggedIn => {
      this.feathersService = this.authService.getService('users')
      this.feathersService
        .on('created', user => this.onCreated(user))
        .on('updated', user => this.onUpdated(user))
        .on('removed', user => this.onRemoved(user))
      this.find()
    // })
  }

  public find() {
    this.feathersService.find({query: {}})
      .then((users: any[]) => {
        this.dataStore.users = users
        this.usersObserver.next(this.dataStore.users)
     })
  }

  private getIndex(id: string): number {
    return _.findIndex(this.dataStore.users, user => user.id === id)
  }

  private onCreated(user: User) {
    this.dataStore.users = [...this.dataStore.users, user]
    this.usersObserver.next(this.dataStore.users)
  }

  private onUpdated(user: User) {
    const index = this.getIndex(user.id)
    this.dataStore.users[index] = user
    this.usersObserver.next(this.dataStore.users)
  }

  private onRemoved(user) {
    this.dataStore.users = _.without(this.dataStore.users, user)
    this.usersObserver.next(this.dataStore.users)
  }
}
