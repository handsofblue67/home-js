import * as _ from 'lodash'
import * as moment from 'moment'
import * as mqtt from 'async-mqtt'

import users from './users/users.service'
import devices from './devices/devices.service'
import deviceTriggers from './device-triggers/device-triggers.service'
import componentStates from './component-states/component-states.service'
import calendars from './calendars/calendars.service'
import alexa from './alexa/alexa.service'

export default function () {
  const app = this // eslint-disable-line no-unused-vars

  app.configure(users)
  app.configure(devices)
  app.configure(deviceTriggers)
  app.configure(componentStates)
  app.configure(alexa)

  const createSubscriptions = () => {
    app.mqttClient.subscribe('/status/#')
    app.mqttClient.subscribe('/currentSettings/#')
    app.mqttClient.subscribe('/will/#')
    app.configure(calendars)
  }

  app.mqttClient = mqtt.connect('mqtt://broker:1883')
  app.mqttClient.on('connect', createSubscriptions)

  const handleCurrentSettingTopic = async (deviceService, parsedMessage) => {
    try {
      console.log(parsedMessage)
      const results = await deviceService.find()

      if (_.some(results.data, ['deviceID', parsedMessage.deviceID])) {
        console.log('updating reconnected device', results.total)
        const updatedDoc = {
          ...parsedMessage,
          createdAt: results.data[0].createdAt,
          updatedAt: Date.now(),
          lastSeen: Date.now()
        }
        deviceService.update(parsedMessage.deviceID, parsedMessage)
      } else {
        console.log(`new device created: ${parsedMessage.deviceID}`)
        deviceService.create({ ...parsedMessage, lastSeen: Date.now() })
      }
    } catch (err) {
      throw new Error(`Error in handleCurrentSettingTopic(): ${err}`)
    }
  }

  const handleStatusTopic = async (deviceService, parsedMessage) => {
    try {
      const results = await deviceService.find(parsedMessage.deviceID)
      const device = results.data[0]

      const sameState = _.every(device.components, (component: any, index) => {
        return component.controlState == parsedMessage.components[index].controlState
      })

      if (sameState) {
        console.log('sameState')
        return
      } // only update database if device pushes a new state

      const updatedDoc = {
        ...parsedMessage,
        createdAt: device.createdAt,
        updatedAt: Date.now(),
        lastSeen: Date.now()
      }

      deviceService.update(updatedDoc.deviceID, updatedDoc)

      const { deviceID, updatedAt, components } = device

      const oldStates = {
        components,
        deviceID,
        _id: `${deviceID}_${moment(updatedAt)}`
      }

      if (_.some(oldStates.components, 'isTimeSeries')) {
        // if time-series data, push old state to separate collection for historical data
        app.service('componentStates').create(oldStates)
      }

    } catch (err) {
      throw new Error(`Error in handleStatusTopic(): ${err}`)
    }
  }

  const handleWillTopic = (deviceService, topic) => {
    const deviceID = topic.replace('/will/', '')
    console.log('lost connection with', deviceID)
    deviceService.remove(deviceID)
  }

  const handlePublishedData = async (topic, message) => {
    try {
      const deviceService = app.service('devices')
      const stringMessage = message.toString()
      const parsedMessage = JSON.parse(stringMessage)

      if (/currentSettings\/.*/.test(topic)) return handleCurrentSettingTopic(deviceService, parsedMessage)

      else if (/status\/.*/.test(topic)) return handleStatusTopic(deviceService, parsedMessage)

      else if (/will\/.*/.test(topic)) return handleWillTopic(deviceService, topic)

      return

    } catch (err) {
      console.log(err)
    }
  }

  // Published messages get handled here
  app.mqttClient.on('message', handlePublishedData)

}
