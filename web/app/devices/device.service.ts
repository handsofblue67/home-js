import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'
import * as _ from 'lodash'

import { AuthService } from '../auth.service'

@Injectable()
export class DeviceService {
  private deviceSource = new BehaviorSubject<any[]>([])
  public devices$ = this.deviceSource.asObservable().share()

  private feathersService: any
  devices = []
  authSubscription: Subscription

  // TODO: figure out how to not get a new token everytime a service is called...
  constructor(private authService: AuthService) {
    this.feathersService = this.authService.getService('devices')
    this.feathersService.find().then((update: any) => {
      const devices = update.data
      this.devices = devices
      this.deviceSource.next(this.devices)
    })
    this.feathersService
      .on('created', device => this.onCreated(device))
      .on('updated', device => this.onUpdated(device))
      .on('removed', device => this.onRemoved(device))
  }

  private onCreated(device: any) {
    this.devices = [...this.devices, device]
    this.deviceSource.next(this.devices)
  }

  private onUpdated(updatedDevice: any) {
    if (typeof updatedDevice === 'number') { return }

    this.devices = _.map(this.devices, device => {
      return _.cloneDeep((device.deviceID === updatedDevice.deviceID) ? updatedDevice : device)
    })
    this.deviceSource.next(this.devices)
  }

  private onRemoved(removedDevice) {
    this.devices = _.reject(this.devices, ['deviceID', removedDevice.deviceID])
    this.deviceSource.next(this.devices)
  }

  public toggle(device: any, index: number) {
    this.feathersService.update(device.deviceID, device)
  }

  public findDevice(deviceID: string): Promise<any> {
    return Promise.resolve(this.devices).then(devices => _.find(devices, ['deviceID', deviceID]))
  }
}
