const mqtt = require('mqtt')
const _ = require('lodash')
const Rx = require('rxjs')
let settings = require('./settings.json')
let mqttClient = mqtt.connect('mqtt://localhost:1883')

// mqttClient.options.will = {
//   topic: `/lastWill/${settings.deviceID}`,
//   payload: `remove`
// }

let timer = settings.checkinFreq ? Rx.Observable.interval(settings.checkinFreq) : undefined

mqttClient.on('connect', () => {
  mqttClient.subscribe(settings.topics.sub.reqStatus)
  mqttClient.subscribe(settings.topics.sub.settings)
})

if (timer) timer.subscribe(() => mqttClient.publish(settings.topics.pub.status, JSON.stringify(settings)))

console.log(settings)

mqttClient.publish(settings.topics.pub.currentSettings, JSON.stringify(settings))

mqttClient.on('message', (topic, message) => {
  const parsedMessage = JSON.parse(message.toString())
  switch (topic) {
    case settings.topics.sub.reqStatus:
      mqttClient.publish(settings.topics.pub.status, JSON.stringify(settings))
      break
    case settings.topics.sub.settings:
      console.log(`Topic: ${topic}
      new state: ${parsedMessage}`)
      settings.components = [ ...parsedMessage ]
      mqttClient.publish(settings.topics.pub.status, JSON.stringify(settings))
      break
  }
})