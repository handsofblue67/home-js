'use strict';

// src/services/device/hooks/trigger.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const _ = require('lodash');
const defaults = {};

module.exports = function (options) {
  return function (hook) {
    let logger = hook.app.logger;
    logger.info('checking for triggers...');
    const triggerService = hook.app.service('deviceTriggers');
    const deviceService = hook.app.service('devices');
    hook.data.deviceID = hook.data.deviceID + ''
    const source = hook.data;

    // logger.info('source:', JSON.stringify(source, null, 2))

    triggerService.find().then(triggerResults => {
      // logger.info('triggers:', JSON.stringify(triggerResults.data, null, 2));
      if (_.some(triggerResults.data, ['source', source.deviceID])) {
        const triggers = _.filter(triggerResults.data, ['source', source.deviceID + '']);

        deviceService.find().then(deviceResults => {
          // logger.info('deviceResults:', JSON.stringify(deviceResults, null, 2));
          _.each(triggers, trigger => {
            const targetID = trigger.target;
            let target = _.find(deviceResults.data, ['deviceID', targetID]);

            const sourceComponentIndex = _.findIndex(source.components, ['name', trigger.sourceComponent]);
            const targetComponentIndex = _.findIndex(target.components, ['name', trigger.targetComponent]);

            logger.info(`checking: ${source.components[sourceComponentIndex].controlState} ${trigger.trigger.operator} ${trigger.trigger.state}\n...`)

            const fireAction = () => {
              // logger.info(trigger.trigger.operator);
              if (target.components[targetComponentIndex].controlState == trigger.action) {
                logger.info(typeof target.components[targetComponentIndex].controlState, typeof trigger.action);
                logger.info('already in correct state');
                return;
              }
              logger.info('true\nfiring action');
              target.components[targetComponentIndex].controlState = trigger.action;
              // logger.info(JSON.stringify(target.components[targetComponentIndex], null, 2));
              hook.app.mqttClient.publish(target.topics.sub.settings, JSON.stringify(target.components));
            }

            const sourceState = source.components[sourceComponentIndex].controlState;
            switch (trigger.trigger.operator) {
              case '<':
                if (sourceState < trigger.trigger.state) fireAction();
                break;
              case '>':
                if (sourceState > trigger.trigger.state) fireAction();
                break;
              case '≤':
                if (sourceState <= trigger.trigger.state) fireAction();
                break;
              case '≥':
                if (sourceState >= trigger.trigger.state) fireAction();
                break;
              case '=':
                if (sourceState == trigger.trigger.state) fireAction();
                break;
              case '≠':
                if (sourceState != trigger.trigger.state) fireAction();
                break;
            }
          })
        }).catch(err => logger.info('no devices matching found ', err))
      } else {
        logger.info('no trigger found');
      }
    }).catch(err => logger.info('no matching triggers found', err));

    return Promise.resolve(hook);
  };
};
