import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import { DeviceService } from '../device.service'
import { DeviceTriggerService } from '../../device-trigger'
import { Device } from 'app/models'
import { TriggerDefinition } from 'app/models/trigger-definition.model'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  triggers: TriggerDefinition[] = []
  device: Device = <Device>{}

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private deviceService: DeviceService,
    private deviceTriggerService: DeviceTriggerService) { }

  ngOnInit() {
    // TODO maybe have deviceService call deviceTriggerService... somehow simplify and normalize this step
    this.route.params
      .switchMap((params: Params) => this.deviceTriggerService.findTriggers(params['deviceID']))
      .subscribe(triggers => this.triggers = triggers)

    this.route.params
      .switchMap((params: Params) => this.deviceService.findDevice(params['deviceID']))
      .subscribe(device => this.device = device)
  }
}
