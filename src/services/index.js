'use strict';
const chat = require('./chat');
const lights = require('./lights');
const todos = require('./todos');
const devices = require('./devices');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
const mqtt = require('mqtt')

module.exports = function () {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  const mqttClient = mqtt.connect('mqtt://broker')
  mqttClient.on('connect', () => {
    mqttClient.subscribe('/status/#')
    mqttClient.subscribe('/currentSettings/#')
    mqttClient.subscribe('$SYS/#')
    mqttClient.subscribe('#')
  })

  // Published messages get handled here
  mqttClient.on('message', (topic, message) => {
    if (topic.startsWith('$SYS')) return

    console.log(`topic: ${topic}, message: ${message}`)

    const settingsRegExp = new RegExp(/currentSettings\/.*/)
    const statusRegExp = new RegExp(/status\/.*/)
    const parsedMessage = JSON.parse(message.toString())

    if (settingsRegExp.test(topic)) {
      app.service('devices').update(parsedMessage);
    } else if (statusRegExp.test(topic)) {
      this.get(message.deviceID).then(device => {
        app.service(device.deviceType).put(parsedMessage);
      });
    }
  })

  const pushToDevice = options => {
    return hook => {
      console.log(hook);
      // mqttClient.publish(pub.topic, pub.message);
      return Promise.resolve(hook);
    }
  }

  app.configure(authentication);
  app.configure(user);
  app.configure(devices);
  app.configure(todos);
  app.configure(lights);
  app.configure(chat);
};
