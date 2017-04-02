import { Component, OnDestroy } from '@angular/core'
import { MdSnackBar, LiveAnnouncer } from '@angular/material'


import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash'

import { DeviceService } from './device.service'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnDestroy {
  connection: Subscription
  devices: any[] = []

  constructor(public deviceService: DeviceService,
              public live: LiveAnnouncer,
              public snackBar: MdSnackBar) {
    this.connection = deviceService.devices$
      .subscribe(devices => this.devices = devices)
  }

  toggle(device: any, index: number): void {
    this.deviceService.toggle(device, index)
    const snackBarRef = this.snackBar.open('Pushed new state to device', null, { duration: 1000 })
    snackBarRef.afterOpened().subscribe(() => console.log('snackBar closed'))
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }

  private isSensor(device) {
    return _.find(device.components, ['type', 'sensor'])
  }
}
