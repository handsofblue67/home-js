import { Injectable } from '@angular/core'

import * as io from 'socket.io-client'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import '../shared'

@Injectable()
export class BrokerService {
  private socket

  constructor() { }

  getLog(): Observable<any> {
    return new Observable(observer => {
      this.socket = io('/')
      this.socket.on('log', event => observer.next(event))
      return () => this.socket.disconnect()
    })
  }
}
