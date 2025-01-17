const mqtt = require('mqtt')
const _ = require('lodash')
const Rx = require('rxjs')
const Chance = require('chance')
// let settings = require('./settings.json')

let chance = new Chance()

const randID = chance.natural() + ''
const randDeviceName = chance.word()
const randComponentName = chance.word()
const checkin = chance.bool({likelihood: 30})

const host = 'mqtt://broker:1883'

var options = {
  will: {
    topic: `/will/${randID}`,
    payload: 'remove',
    qos: 0,
    retain: false
  },
}

let settings = {
  deviceID: randID,
  name: randDeviceName,
  deviceType: 'Test',
  checkinFreq: checkin ? 10000 : null,
  components: [
    {
      name: randComponentName,
      controlState: checkin ? chance.natural({min:0, max: 1023}) : false,
      type: checkin ? 'sensor' : 'toggle'
    }
  ],
  topics: {
    pub: {
      status: `/status/${randID}`,
      currentSettings: `/currentSettings/${randID}`
    },
    sub: {
      reqStatus: `/reqStatus/${randID}`,
      settings: `/settings/${randID}`
    }
  }
}

let mqttClient = mqtt.connect(host, options)

mqttClient.on('error', err => {
  console.log(err)
  mqttClient.end()
})


mqttClient.on('connect', () => {
  mqttClient.subscribe(settings.topics.sub.reqStatus)
  mqttClient.subscribe(settings.topics.sub.settings)
})

if (checkin) {
  let timer = Rx.Observable
    .interval(settings.checkinFreq)
    .map(() => chance.natural({min:0, max: 1023}))
    .subscribe(value => {
      console.log('.')
      settings.components[0].controlState = value
      mqttClient.publish(settings.topics.pub.status, JSON.stringify(settings))
    })
}
  
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