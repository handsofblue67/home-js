'use strict';

const _ = require('lodash');
const componentState = require('./componentState');
const chat = require('./chat');
const light = require('./light');
const todos = require('./todos');
const device = require('./device');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const moment = require('moment');

module.exports = function () {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.mqttClient = mqtt.connect('mqtt://broker')
  app.mqttClient.on('connect', () => {
    app.mqttClient.subscribe('/status/#');
    app.mqttClient.subscribe('/currentSettings/#');
  });

  // Published messages get handled here
  app.mqttClient.on('message', (topic, message) => {
    const deviceService = app.service('devices')
    const parsedMessage = JSON.parse(message.toString());
    if (/currentSettings\/.*/.test(topic)) {
      deviceService.find(parsedMessage.deviceID).then(result => {
        if (result.total) {
          parsedMessage.createdAt = result.data[0].createdAt;
          parsedMessage.updatedAt = Date.now();
          deviceService.update(parsedMessage.deviceID, parsedMessage);
        } else {
          deviceService.create(parsedMessage);
        }
      }).catch(err => console.error('catch', err || 'error getting'))
    } else if (/status\/.*/.test(topic)) {
      deviceService.find(parsedMessage.deviceID).then(result => {
        const device = result.data[0];
        const sameState = _.every(device.components, (component, name) => {
          return component.controlState == parsedMessage.components[name].controlState;
        });
        if (!sameState) {
          console.log('changed state')
          parsedMessage.createdAt = device.createdAt;
          parsedMessage.updatedAt = Date.now();
          deviceService.update(parsedMessage.deviceID, parsedMessage);
          const oldStates = _.assign({ components: device.components }, { deviceID: device.deviceID, _id: `${device.deviceID}_${moment(device.updatedAt)}` });
          console.log(oldStates);
          if (_.some(oldStates.components, 'isTimeSeries')) {
            app.service('componentStates').create(oldStates);
          }
        }
      });
    }
  });

  app.configure(authentication);
  app.configure(user);
  app.configure(device);
  app.configure(todos);
  app.configure(light);
  app.configure(chat);
  app.configure(componentState);
};
