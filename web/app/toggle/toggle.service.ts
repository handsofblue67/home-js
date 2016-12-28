import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import '../shared'
import * as _ from 'lodash'
import * as io from 'socket.io-client'

import { Device } from '../models'

@Injectable()
export class ToggleService {
  private socket
  states: Array<any> = []

  constructor() { }

  toggle(device: Device) {
    const topic = device.topics.sub.toggle
    const mqtt = { topic: topic, message: (new Date()).toString() }
    this.socket.emit('publish', mqtt)
  }

  getStates(): Observable<any> {
    return new Observable(observer => {
      this.socket = io('/')
      this.socket.emit('joinToggle', { username: JSON.parse(localStorage.getItem('currentUser')).username })

      this.socket.on('initToggle', currentStatus => {
        this.states = currentStatus
        observer.next(this.states)
      })
      this.socket.on('stateChange', update => {
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
