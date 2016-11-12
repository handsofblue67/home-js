import { Injectable } from '@angular/core'

import * as io from 'socket.io-client'
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'
import '../shared'

import { BackendService } from '../backend.service'

@Injectable()
export class ChatService {
  private socket: SocketIOClient.Socket
  messages: Array<any> = []

  constructor(private backendService: BackendService) {
    backendService.getChat().subscribe(history => this.messages = history)
  }

  // TODO: break backend into modules, so there are separate websocket endpoints
  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket = io('/')
      this.socket.on('newMessage', message => {
        this.messages = [ message, ...this.messages]
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
