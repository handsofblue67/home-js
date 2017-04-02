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
    const source = hook.data;

    triggerService.find().then(results => {
      if (_.some(results.data, ['source', hook.data.deviceID])) {
        const triggers = _.filter(results.data, ['source', source.deviceID]);


        deviceService.find().then(deviceResults => {
          _.each(triggers, trigger => {
            const targetID = trigger.target;
            let target;
            target = _.find(deviceResults.data, ['deviceID', targetID]);

            let componentIndex = _.findIndex(target.components, ['name', trigger.targetComponent]);

            logger.info(`checking: ${source.components[componentIndex].controlState} ${trigger.trigger.operator} ${trigger.trigger.state}`)

            switch (trigger.trigger.operator) {
              case '<':
                if (source.components[componentIndex].controlState < trigger.trigger.state) {
                  logger.info('found device with trigger');
                  logger.info(trigger.trigger.operator);
                  if (target.components[componentIndex].controlState === trigger.action) break;
                  target.components[componentIndex].controlState = trigger.action;
                  logger.info(JSON.stringify(target.components[componentIndex], null, 2));
                  hook.app.mqttClient.publish(target.topics.sub.settings, JSON.stringify(target.components));
                }
                break;
              case '>':
                if (source.components[componentIndex].controlState > trigger.trigger.state) {
                  logger.info('found device with trigger');
                  logger.info(trigger.trigger.operator);
                  if (target.components[componentIndex].controlState === trigger.action) break;
                  target.components[componentIndex].controlState = trigger.action;
                  logger.info(JSON.stringify(target.components[componentIndex], null, 2));
                  hook.app.mqttClient.publish(target.topics.sub.settings, JSON.stringify(target.components));
                }
                break;
              case '≤':
                if (source.components[componentIndex].controlState <= trigger.trigger.state) {
                  logger.info('found device with trigger');
                  logger.info(trigger.trigger.operator);
                  if (target.components[componentIndex].controlState === trigger.action) break;
                  target.components[componentIndex].controlState = trigger.action;
                  logger.info(JSON.stringify(target.components[componentIndex], null, 2));
                  hook.app.mqttClient.publish(target.topics.sub.settings, JSON.stringify(target.components));
                }
                break;
              case '≥':
                if (source.components[componentIndex].controlState >= trigger.trigger.state) {
                  logger.info('found device with trigger');
                  logger.info(trigger.trigger.operator);
                  if (target.components[componentIndex].controlState === trigger.action) break;
                  target.components[componentIndex].controlState = trigger.action;
                  logger.info(JSON.stringify(target.components[componentIndex], null, 2));
                  hook.app.mqttClient.publish(target.topics.sub.settings, JSON.stringify(target.components));
                }
                break;
              case '=':
                if (source.components[componentIndex].controlState == trigger.trigger.state) {
                  logger.info('found device with trigger');
                  logger.info(trigger.trigger.operator);
                  if (target.components[componentIndex].controlState === trigger.action) break;
                  target.components[componentIndex].controlState = trigger.action;
                  logger.info(JSON.stringify(target.components[componentIndex], null, 2));
                  hook.app.mqttClient.publish(target.topics.sub.settings, JSON.stringify(target.components));
                }
                break;
              case '≠':
                if (source.components[componentIndex].controlState != trigger.trigger.state) {
                  logger.info('found device with trigger');
                  logger.info(trigger.trigger.operator);
                  if (target.components[componentIndex].controlState === trigger.action) break;
                  target.components[componentIndex].controlState = trigger.action;
                  logger.info(JSON.stringify(target.components[componentIndex], null, 2));
                  hook.app.mqttClient.publish(target.topics.sub.settings, JSON.stringify(target.components));
                }
                break;
            }
          })
        })
      } else {
        logger.info('no trigger found');
      }

    }).catch(err => logger.info('catch', err || 'error getting'));

    return Promise.resolve(hook);
  };
};
