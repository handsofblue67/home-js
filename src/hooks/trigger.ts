// src/services/device/hooks/trigger.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html
import { some, filter, each, find, findIndex } from 'lodash'

const fireAction = (hook: any, target: any, index: any, trigger: any) => {
  if (target.components[index].controlState == trigger.action) {
    return 'no change'
  }
  // TODO: make this immutable
  target.components[index].controlState = trigger.action
  hook.app.mqttClient.publish(target.topics.sub.settings, JSON.stringify(target.components))
  return 'pushed change'
}

export default function () {
  return async function (hook) {
    // let logger = hook.app.logger
    const triggerService = hook.app.service('deviceTriggers')
    const deviceService = hook.app.service('devices')
    hook.data.deviceID = hook.data.deviceID + ''
    const source = hook.data

    const triggerResults = await triggerService.find()

    // if none of the results match the source
    if (!some(triggerResults.data, ['source', source.deviceID])) return

    const triggers = filter(triggerResults.data, ['source', source.deviceID + ''])

    const deviceResults = await deviceService.find()
    each(triggers, (trigger: any) => {
      const targetID = trigger.target
      const target: any = find(deviceResults.data, ['deviceID', targetID])

      const sourceComponentIndex = findIndex(source.components, ['name', trigger.sourceComponent])
      const targetComponentIndex = findIndex(target.components, ['name', trigger.targetComponent])

      const sourceState = source.components[sourceComponentIndex].controlState
      switch (trigger.trigger.operator) {
        case '<':
          if (sourceState < trigger.trigger.state) {
            return fireAction(hook, target, targetComponentIndex, trigger)
          }
          break
        case '>':
          if (sourceState > trigger.trigger.state) {
            return fireAction(hook, target, targetComponentIndex, trigger)
          }
          break
        case '≤':
          if (sourceState <= trigger.trigger.state) {
            return fireAction(hook, target, targetComponentIndex, trigger)
          }
          break
        case '≥':
          if (sourceState >= trigger.trigger.state) {
            return fireAction(hook, target, targetComponentIndex, trigger)
          }
          break
        case '=':
          if (sourceState == trigger.trigger.state) {
            return fireAction(hook, target, targetComponentIndex, trigger)
          }
          break
        case '≠':
          if (sourceState != trigger.trigger.state) {
            return fireAction(hook, target, targetComponentIndex, trigger)
          }
          break
      }

    })
    return hook
  }
}
