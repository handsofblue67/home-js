import { Component, EventEmitter, Input, Output } from '@angular/core'

import * as _ from 'lodash'

import { DeviceService } from '../../devices/device.service'
import { DeviceTriggerService } from '../'
import { Device, DeviceComponent } from '../../models/device.model'
import { TriggerDefinition, Trigger } from '../../models/trigger-definition.model'

@Component({
  selector: 'app-trigger-form',
  templateUrl: './trigger-form.component.html',
  styleUrls: ['./trigger-form.component.css']
})
export class TriggerFormComponent {
  @Input() otherDevices = []

  comparisonOperators = ['<', '>', '≤', '≥', '=', '≠']

  triggerDefinition: any = {}

  @Input()
  trigger(trigger: TriggerDefinition) {
    let sourceDevice
    this.deviceService.findDevice(trigger.source).then(device => sourceDevice = device)
    let targetDevice
    this.deviceService.findDevice(trigger.target).then(device => targetDevice = device)

    this.triggerDefinition = {
      source: sourceDevice,
      sourceComponent: _.find(sourceDevice.components, ['name', trigger.sourceComponent]),
      target: targetDevice,
      targetComponent: _.find(targetDevice.components, ['name', trigger.targetComponent]),
      action: trigger.action,
      trigger: trigger.trigger,
    }
    console.log(this.triggerDefinition)
  }

  // @Output() onSubmit = new EventEmitter<any>()
  @Input()
  set device(device: Device) {
    this.triggerDefinition.source = device
  }

  constructor(
    public deviceService: DeviceService,
    private deviceTriggerService: DeviceTriggerService) {
    this.triggerDefinition.trigger = {
      operator: '',
      state: false
    }
  }

  submit(trigDef: any) {
    const parsedTrigDef = <TriggerDefinition>{
      source: trigDef.source.deviceID,
      sourceComponent: trigDef.sourceComponent.name,
      target: trigDef.target.deviceID,
      targetComponent: trigDef.targetComponent.name,
      action: trigDef.action,
      trigger: trigDef.trigger,
    }

    this.deviceTriggerService.createTrigger(parsedTrigDef)
  }
}
