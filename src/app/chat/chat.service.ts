import { Injectable } from '@angular/core'

import * as io from 'socket.io-client'
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'
import '../shared'

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
          console.log(moment(message.timestamp).calendar())
          return {
            text: message.text,
            user: message.user,
            timestamp: moment(message.timestamp).calendar()
          }
        })
        console.log(this.messages)
        observer.next(this.messages)
      })

      this.socket.on('newMessage', message => {
        this.messages = [
          {
            text: message.text,
            user: message.user,
            timestamp: moment(message.timestamp).calendar()
          },
          ...this.messages
        ]
        observer.next(this.messages)
      })
      return () => this.socket.disconnect()
    })
  }

  sendMessage(message): void {
    this.socket.emit('addMessage', JSON.stringify({
      text: message,
      user: JSON.parse(localStorage.getItem('profile')).nickname,
      timestamp: moment(),
    }))
  }
}
