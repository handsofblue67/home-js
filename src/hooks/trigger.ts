// src/services/device/hooks/trigger.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const _ = require('lodash')

export default function() {
  return function(hook) {
    // let logger = hook.app.logger
    const triggerService = hook.app.service('deviceTriggers')
    const deviceService = hook.app.service('devices')
    hook.data.deviceID = hook.data.deviceID + ''
    const source = hook.data

    triggerService.find().then(triggerResults => {
      if (_.some(triggerResults.data, ['source', source.deviceID])) {
        const triggers = _.filter(triggerResults.data, ['source', source.deviceID + ''])

        deviceService.find().then(deviceResults => {
          _.each(triggers, trigger => {
            const targetID = trigger.target
            let target = _.find(deviceResults.data, ['deviceID', targetID])

            const sourceComponentIndex = _.findIndex(source.components, ['name', trigger.sourceComponent])
            const targetComponentIndex = _.findIndex(target.components, ['name', trigger.targetComponent])

            // logger.info(`checking: ${source.components[sourceComponentIndex].controlState} ${trigger.trigger.operator} ${trigger.trigger.state}\n...`)

            const fireAction = () => {
              if (target.components[targetComponentIndex].controlState == trigger.action) {
                return
              }
              target.components[targetComponentIndex].controlState = trigger.action
              hook.app.mqttClient.publish(target.topics.sub.settings, JSON.stringify(target.components))
            }

            const sourceState = source.components[sourceComponentIndex].controlState
            switch (trigger.trigger.operator) {
            case '<':
              if (sourceState < trigger.trigger.state) fireAction()
              break
            case '>':
              if (sourceState > trigger.trigger.state) fireAction()
              break
            case '≤':
              if (sourceState <= trigger.trigger.state) fireAction()
              break
            case '≥':
              if (sourceState >= trigger.trigger.state) fireAction()
              break
            case '=':
              if (sourceState == trigger.trigger.state) fireAction()
              break
            case '≠':
              if (sourceState != trigger.trigger.state) fireAction()
              break
            }
          })
        }).catch(err => { })
      }
    }).catch(err => { })

    return Promise.resolve(hook)
  }
}
