import { Injectable } from '@angular/core'

import * as io from 'socket.io-client'
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'
import '../shared'
import * as _ from 'lodash'

@Injectable()
export class ChatService {
  private socket: SocketIOClient.Socket
  messages: Array<any> = []

  constructor() { }


  // TODO: break backend into modules, so there are separate websocket endpoints
  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket = io('/')
      this.socket.emit('join', {email: JSON.parse(localStorage.getItem('profile')).email})

      this.socket.on('init', messages => {
        this.messages = _.map(messages, (message: any) => {
          return {
            text: message.text,
            user: message.user,
            timestamp: moment(message.timestamp).calendar(),
            avatar: message.avatar,
          }
        })
        observer.next(this.messages)
      })

      this.socket.on('newMessage', message => {
        this.messages = [
          {
            text: message.text,
            user: message.user,
            timestamp: moment(message.timestamp).calendar(),
            avatar: message.avatar,
          },
          ...this.messages
        ]
        observer.next(this.messages)
      })
      return () => this.socket.disconnect()
    })
  }

  sendMessage(message): void {
    let profile = JSON.parse(localStorage.getItem('profile'))
    this.socket.emit('addMessage', JSON.stringify({
      text: message,
      user: profile.nickname,
      timestamp: moment(),
      avatar: profile.user_metadata.picture || profile.picture,
    }))
  }
}
