import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import './shared'
import * as _ from 'lodash'

import { BackendService } from './backend.service'
import { Device, DeviceType, DeviceStatus, Mqtt } from './models'

@Injectable()
export class ToggleService {
  switches: Array<Device>
  private switchSource = new BehaviorSubject<Array<Device>>([])
  switch$ = this.switchSource.asObservable()

  constructor(private backend: BackendService) {
    backend.getDevicesByType('digitalOutput').subscribe(devices => {
      this.switches = _.map(devices, device => {
        let curriedNormalize;
        backend.getDeviceData(device).subscribe(status => curriedNormalize = this.normalize(status))
        return curriedNormalize(device)
      })
      this.switchSource.next(this.switches)
    })
  }

  toggleDevice(device: Device) {
    let topic = device.topics.sub.toggle
    let mqtt = { topic: topic, message: (new Date()).toString() }
    this.backend.publish(mqtt).subscribe(() => {
      this.backend.getDeviceData(device).subscribe(status => {
        this.switches = [
          ..._.reject(this.switches, ['deviceID', device.deviceID]),
          this.normalize(status)(device)
        ]
        this.switchSource.next(this.switches)
      })
    })
  }

  private normalize(statuses: Array<DeviceStatus>): (device: Device) => Device {
    return (device: Device): Device => {
      return {
        deviceID: device.deviceID,
        name: device.name,
        topics: device.topics,
        timestamp: device.timestamp,
        primaryType: device.primaryType,
        status: statuses,
        checkinFreq: device.checkinFreq,
      }
    }
  }
}
