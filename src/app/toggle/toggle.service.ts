import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import '../shared'
import * as _ from 'lodash'
import * as io from 'socket.io-client'

import { BackendService } from '../backend.service'
import { Device, DeviceStatus } from '../models'

@Injectable()
export class ToggleService {
  private socket
  switches: Array<Device> = []
  private switchSource = new BehaviorSubject<Array<Device>>([])
  switch$ = this.switchSource.asObservable()

  constructor(private backend: BackendService) {
    backend.getDevicesByType('digitalOutput').subscribe(devices => {
      _.each(devices, device => this.getData(device))
    })
  }

  toggle(device: Device) {
    const topic = device.topics.sub.toggle
    const mqtt = { topic: topic, message: (new Date()).toString() }
    this.socket.emit('toggle', mqtt)
  }

  getState(): Observable<any> {
    return new Observable(observer => {
      this.socket = io('/')
      this.socket.on('stateChange', state => {
        state = state.status
        this.normalize(
          _.reject(this.switches, ['deviceID', state.deviceID]),
          _.find(this.switches, ['deviceID', state.deviceID]),
          [state])
      })
      return () => this.socket.disconnect()
    })
  }

  private normalize(switches: Array<Device>, device: Device, statuses: Array<DeviceStatus>): void {
    this.switches = [
      ...switches, {
        deviceID: device.deviceID,
        name: device.name,
        topics: device.topics,
        timestamp: device.timestamp,
        primaryType: device.primaryType,
        status: statuses,
        checkinFreq: device.checkinFreq,
      }
    ]
    this.switchSource.next(this.switches)
  }

  private getData(device: Device) {
    this.backend.getDeviceData(device).subscribe(status => {
      this.normalize(this.switches, device, status)
    })
  }
}
