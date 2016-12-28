import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import '../shared'
import * as _ from 'lodash'
import * as io from 'socket.io-client'

@Injectable()
export class TemperatureService {
  private socket
  states: Array<any> = []

  constructor() { }

  getTemps(): Observable<any> {
    return new Observable(observer => {
      this.socket = io('/')
      this.socket.emit('joinTemperature', { username: JSON.parse(localStorage.getItem('currentUser')).username })

      this.socket.on('initTemperature', currentStatus => {
        this.states = currentStatus
        observer.next(this.states)
      })
      this.socket.on('digitalInputChange', update => {
        this.states = _.map(this.states, device => {
          if (device.deviceID === update.status.deviceID) {
            device.status = update.status
          }
          return device
        })
        observer.next(this.states)
      })
      return () => this.socket.disconnect()
    })
  }
}
