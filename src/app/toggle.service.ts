import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import './shared'
import * as _ from 'lodash'

import { BackendService } from './backend.service'
import { Device, DeviceType, DeviceStatus, Mqtt } from './models'

@Injectable()
export class ToggleService {
  switches: Array<Device> = []
  private switchSource = new BehaviorSubject<Array<Device>>([])
  switch$ = this.switchSource.asObservable()

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
