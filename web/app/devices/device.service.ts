import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'
import * as _ from 'lodash'

import { AuthService } from '../auth.service'

@Injectable()
export class DeviceService {
  public devices$: Observable<any[]>
  private devicesObserver: Observer<any[]>

  private feathersService: any
  private devices = []
  authSubscription: Subscription

  // TODO: figure out how to not get a new token everytime a service is called...
  constructor(private authService: AuthService) {
    this.devices$ = <Observable<any[]>>new Observable(observer => this.devicesObserver = observer).share()
    this.feathersService = this.authService.getService('devices')
    this.feathersService.find().then((devices: any[]) => {
      this.devices = devices
      this.devicesObserver.next(this.devices)
    })
    this.feathersService
      .on('created', device => this.onCreated(device))
      .on('updated', device => this.onUpdated(device))
      .on('removed', device => this.onRemoved(device))
  }

  private getIndex(id: string): number {
    return _.findIndex(this.devices, device => device.deviceID === id)
  }

  private onCreated(device: any) {
    this.devices = [...this.devices, device]
    this.devicesObserver.next(this.devices)
  }

  private onUpdated(device: any) {
    const index = this.getIndex(device.deviceID)
    this.devices[index] = _.assign({}, this.devices[index], device)
    this.devicesObserver.next(this.devices)
  }

  private onRemoved(device) {
    this.devices = _.without(this.devices, device)
    this.devicesObserver.next(this.devices)
  }

  public toggle(device: any, index: number) {
    // const updatedComponents = _.map(device.components, (component: any, i) => {
    //   return (i === index) ? _.assign({}, component, {controlState: !component.controlState}) : component
    // })
    // const updatedDevice = _.assign({}, device, {components: [ ...updatedComponents ]})
    this.feathersService.update(device.deviceID, device)
  }
}
