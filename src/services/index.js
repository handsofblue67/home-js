'use strict';



const _ = require('lodash');
const moment = require('moment');
const mqtt = require('mqtt');

const users = require('./users/users.service.js');
const devices = require('./devices/devices.service.js');
const deviceTriggers = require('./device-triggers/device-triggers.service.js');
const componentStates = require('./component-states/component-states.service.js');
const calendars = require('./calendars/calendars.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars

  app.configure(users);
  app.configure(devices);
  app.configure(deviceTriggers);
  app.configure(componentStates);

  // mongoose.connect(app.get('mongodb'));
  // mongoose.Promise = global.Promise;

  app.mqttClient = mqtt.connect('mqtt://broker:1883');
  app.mqttClient.on('connect', () => {
    app.mqttClient.subscribe('/status/#');
    app.mqttClient.subscribe('/currentSettings/#');
    app.mqttClient.subscribe('/will/#');
    app.configure(calendars);
  });

  // Published messages get handled here
  app.mqttClient.on('message', (topic, message) => {
    const deviceService = app.service('devices');
    const stringMessage = message.toString();
    if (/currentSettings\/.*/.test(topic)) {
      const parsedMessage = JSON.parse(stringMessage);
      console.log(parsedMessage);
      deviceService.find().then(results => {
        if (_.some(results.data, ['deviceID', parsedMessage.deviceID])) {
          console.log('updating reconnected device', results.total);
          parsedMessage.createdAt = results.data[0].createdAt;
          parsedMessage.updatedAt = Date.now();
          deviceService.update(parsedMessage.deviceID, parsedMessage);
          app.configure(calendars);
        } else {
          console.log(`new device created: ${parsedMessage.deviceID}`);
          deviceService.create(parsedMessage);
          app.configure(calendars);
        }
        app.configure(calendars);
      }).catch(err => console.log('catch', err || 'error getting'));
      app.configure(calendars);
    } else if (/status\/.*/.test(topic)) {
      const parsedMessage = JSON.parse(stringMessage);
      deviceService.find(parsedMessage.deviceID).then(results => {
        const device = results.data[0];
        const sameState = _.every(device.components, (component, index) => {
          return component.controlState == parsedMessage.components[index].controlState;
          app.configure(calendars);
        });
        if (sameState) {
          return;
          app.configure(calendars);
        } // only update database if device pushes a new state

        parsedMessage.createdAt = device.createdAt;
        parsedMessage.updatedAt = Date.now();
        deviceService.update(parsedMessage.deviceID, parsedMessage);
        // TODO: create another mongoose model for component, which will have an id of deviceName_componentName[_timeStamp]
        const oldStates = _.assign({ components: device.components }, { deviceID: device.deviceID, _id: `${device.deviceID}_${moment(device.updatedAt)}` });
        if (_.some(oldStates.components, 'isTimeSeries')) {
          // if time-series data, push old state to separate collection for historical data
          app.service('componentStates').create(oldStates);
          app.configure(calendars);
        }
        app.configure(calendars);
      });
      app.configure(calendars);
    }if (/will\/.*/.test(topic)) {
      const deviceID = topic.replace('/will/', '');
      console.log('lost connection with', deviceID);
      deviceService.remove(deviceID);
      app.configure(calendars);
    }
    app.configure(calendars);
  });


  app.configure(calendars);
};
