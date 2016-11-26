import { Injectable } from '@angular/core'

import * as io from 'socket.io-client'
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'
import '../shared'
import * as _ from 'lodash'

@Injectable()
export class DextersLabService {
  private socket: SocketIOClient.Socket
  events: Array<any> = []

  constructor() { }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket = io('/')
      this.socket.emit('joinDextersLab', {username: JSON.parse(localStorage.getItem('currentUser')).username})

      this.socket.on('initDextersLab', events => {
        this.events = _.map(events, (message: any) => {
          return {
            text: message.text,
            user: message.user,
            timestamp: moment(message.timestamp).calendar(),
            avatar: message.avatar,
          }
        })
        observer.next(this.events)
      })

      this.socket.on('newMessage', message => {
        this.events = [
          {
            text: message.text,
            user: message.user,
            timestamp: moment(message.timestamp).calendar(),
            avatar: message.avatar,
          },
          ...this.events
        ]
        observer.next(this.events)
      })
      return () => this.socket.disconnect()
    })
  }
}
