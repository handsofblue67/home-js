import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { DeviceService } from './device.service'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: [ './devices.component.css' ],
})
export class DevicesComponent implements OnInit, OnDestroy {
  connection: Subscription
  devices: any[] = []

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.connection = this.deviceService.devices$
      .subscribe(devices => this.devices = devices)
  }

  toggle(device: any, index: number): void {
    console.log('changed toggle state')
    this.deviceService.toggle(device, index)
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }
}
