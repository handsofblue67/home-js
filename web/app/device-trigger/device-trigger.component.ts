import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash'

import { DeviceService } from '../devices/device.service'
import { DeviceTriggerService } from './'

@Component({
  selector: 'app-device-trigger',
  templateUrl: './device-trigger.component.html',
  styleUrls: ['./device-trigger.component.css'],
  providers: [ DeviceTriggerService ],
})
export class DeviceTriggerComponent implements OnInit, OnDestroy {
  otherDevices: any[] = []
  device: any
  selectedOperator = null
  triggerComponent: any
  triggerState: number

  targetDevice: any
  targetComponent: any
  targetState: any

  comparisonOperators = [ '<', '>', '≤', '≥', '=', '≠' ]

  constructor(
    public deviceService: DeviceService,
    private route: ActivatedRoute,
    private location: Location,
    private deviceTriggerService: DeviceTriggerService) { }

  ngOnInit(): void {
    const subscribeToDevices = device => {
      this.otherDevices = _.without(this.deviceService.devices, device)
    }

    this.route.params
      .switchMap((params: Params) => this.deviceService.findDevice(params['deviceID']))
      .subscribe(device => {
        this.device = device
        subscribeToDevices(device)
      })
  }

  ngOnDestroy() {
  }

  create() {
    const triggerAction = {
      source: this.device.deviceID,
      trigger: {
        operator: this.selectedOperator,
        state: this.triggerState,
      },
      target: this.targetDevice.deviceID,
      targetComponent: this.targetComponent.name,
      action: this.targetState,
    }
    this.deviceTriggerService.createTrigger(triggerAction)
  }
}
