import { Device, DeviceComponent } from './device.model'
export class TriggerDefinition {
  source = ''
  sourceComponent = ''
  target = ''
  targetComponent = ''
  action = false
  trigger: Trigger
}

export class Trigger {
  operator = ''
  state = 0
}
