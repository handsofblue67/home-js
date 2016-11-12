import { Injectable } from '@angular/core'

import * as io from 'socket.io-client'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import '../shared'

import { Angular2AutoScroll } from 'angular2-auto-scroll/lib/angular2-auto-scroll.directive'

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
