import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import '../shared'
import * as _ from 'lodash'
import * as io from 'socket.io-client'

import { BackendService } from '../backend.service'
import { Device, DeviceType, DeviceStatus, Mqtt } from '../models'

@Injectable()
export class ToggleService {
  switches: Array<Device> = []
  private switchSource = new BehaviorSubject<Array<Device>>([])
  switch$ = this.switchSource.asObservable()

  private socket

  constructor(private backend: BackendService) {
    backend.getDevicesByType('digitalOutput').subscribe(devices => {
      _.each(devices, device => this.getData(device))
    })
  }

  // TODO: fix this so we don't have to use a timer
  toggleDevice(device: Device) {
    let topic = device.topics.sub.toggle
    let mqtt = { topic: topic, message: (new Date()).toString() }
    this.backend.publish(mqtt).subscribe(() => setTimeout(() => {
      this.backend.getDeviceData(device).subscribe(status => {
        this.normalize(_.reject(this.switches, ['deviceID', device.deviceID]), device, status)
      })
    }, 500))
  }

  toggle(device: Device) {
    let topic = device.topics.sub.toggle
    let mqtt = { topic: topic, message: (new Date()).toString() }

    // this.backend.publish(mqtt).subscribe(() => setTimeout(() => {
    //   this.backend.getDeviceData(device).subscribe(status => {
    //     this.normalize(_.reject(this.switches, ['deviceID', device.deviceID]), device, status)
    //   })
    // }, 500))

    this.socket.emit('toggle', mqtt)
  }

  getState(): Observable<any> {
    return new Observable(observer => {
      this.socket = io('/')
      this.socket.on('stateChange', state => {
        state = state.status
        console.log(state)
        let updatedDevice: Device = _.find(this.switches, ['deviceID',state.deviceID])
        this.switches = [ ..._.reject(this.switches, ['deviceID', state.deviceID]), {
          deviceID: updatedDevice.deviceID,
          name: updatedDevice.name,
          topics: updatedDevice.topics,
          timestamp: updatedDevice.timestamp,
          primaryType: updatedDevice.primaryType,
          status: state,
          checkinFreq: updatedDevice.checkinFreq
        }]
        this.switchSource.next(this.switches)
        // console.log(this.switches)
        // observer.next(state)
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