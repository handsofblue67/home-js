import { Component, EventEmitter, Input, Output } from '@angular/core'

import { find } from 'lodash'

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
  async trigger(trigger: TriggerDefinition) {
    const source = await this.deviceService.findDevice(trigger.source)
    const target = await this.deviceService.findDevice(trigger.target)

    this.triggerDefinition = {
      source,
      sourceComponent: find(source.components, ['name', trigger.sourceComponent]),
      target,
      targetComponent: find(target.components, ['name', trigger.targetComponent]),
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
