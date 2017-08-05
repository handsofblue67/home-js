import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import { Subscription } from 'rxjs/Subscription'
import { without } from 'lodash'

import { DeviceService } from '../devices/device.service'
import { DeviceTriggerService } from './'
import { Device } from 'app/models'

@Component({
  selector: 'app-device-trigger',
  templateUrl: './device-trigger.component.html',
  styleUrls: ['./device-trigger.component.css'],
})
export class DeviceTriggerComponent implements OnInit {
  otherDevices: Device[] = []
  device: Device

  constructor(
    public deviceService: DeviceService,
    private route: ActivatedRoute,
    private location: Location,
    private deviceTriggerService: DeviceTriggerService) { }

  ngOnInit(): void {
    const subscribeToDevices = device => {
      this.otherDevices = without(this.deviceService.devices, device)
    }

    this.route.params
      .map((params: Params) => this.deviceService.findDevice(params['deviceID']))
      .subscribe(async device => {
        this.device = await device
        subscribeToDevices(this.device)
      })
  }
}
