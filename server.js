const MongoClient = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mqtt = require('mqtt').connect('mqtt://broker')
const chalk = require('chalk')
const moment = require('moment')
const basicAuth = require('basic-auth')
const app = express()

mqtt.on('connect', () => {
  mqtt.subscribe('/status/#')
  mqtt.subscribe('/currentSettings/#')
})

let auth = (req, res, next) => {
  let user = basicAuth(req)
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    res.sendStatus(401)
  }
  if (user.name === 'handsofblue67' && user.pass === '@basicAuth') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    res.sendStatus(401)
  }
}

MongoClient.connect('mongodb://db', (err, db) => {

  mqtt.on('message', (topic, message) => {
    message = JSON.parse(message.toString())
    // message is a device defintion or a devices status report
    topicRegExp = new RegExp(/currentSettings\/.*/)
    topicRegExp.test(topic) ? updateDevice(message) : addStatus(message)
  })

  // each device and its current settings (one document per device)
  let updateDevice = device => {
    db.collection('devices')
      .updateOne({ 'deviceID': device.deviceID }, { $set: device }, { upsert: true })
  }

  // inputs usually append a document, outputs usually update a single document (its current state)
  let addStatus = status => {
    db.collection('devices').findOne({ 'deviceID': status.deviceID }, (err, result) => {
      switch (result.primaryType) {
        case 'digitalOutput':
          db.collection('statuses')
            .updateOne({ 'deviceID': status.deviceID }, { $set: status }, { upsert: true })
          break
        case 'digitalInput':
          db.collection('statuses').insertOne(status)
          break
        case 'analogOutput':
          db.collection('statuses')
            .updateOne({ 'deviceID': status.deviceID }, { $set: status }, { upsert: true })
        case 'analogInput':
          db.collection('statuses').insertOne(status)
          break
      }
    })
  }

  app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(require('morgan')('dev'))
    .use(express.static(path.join(__dirname, 'dist')))
    .use('/lights', express.static(path.join(__dirname, 'dist')))
    .use('/maps', express.static(path.join(__dirname, 'dist')))
    .use('/charts', express.static(path.join(__dirname, 'dist')))

    .get('/api/devices/:type', (req, res) => {
      db.collection('devices')
        .find({'primaryType':req.params.type})
        .toArray((err, docs) => {
          if (err) console.log(err)
          res.send(docs)
        })
    })

    .get('/api/devices', (req, res) => {
      db.collection('devices')
        .find({}).toArray((err, docs) => {
          res.send(docs)
        })
    })

    .get('/api/statuses/:deviceID', (req, res) => {
      db.collection('statuses')
        .find({'deviceID':+req.params.deviceID})
        .toArray((err, docs) => {
          if (err) console.log(err)
          res.send(docs)
        })
    })

    .post('/api/publish', (req, res) => {
      mqtt.publish(`${req.body.topic}`, req.body.message)
      res.status(200).send('message published')
    })

    .delete('/api/statuses/:id', (req, res) => {
      db.collection('statuses')
        .deleteOne({ _id: new objectID(req.params.id) }, (err, result) => {
          if (err) console.log(err)
          res.send(result)
        })
    })

    .get('/api/broker', (req, res) => {
      res.send('mqtt//broker')
    })

    .get('/api/geofence', (req, res) => {
      db.collection('geofence')
        .distinct('device', (err, result) => {
          if (err) console.log(err)
          res.send(result)
        })
    })

    .post('/api/geofence', auth, (req, res) => {
      console.log(req.body)
      db.collection('geofence').insertOne(req.body)
      res.status(200).send('geofence event saved')
    })

    .get('/api/geofence/:device', (req, res) => {
      const start = moment().startOf('day')
      const end = moment().endOf('day')
      db.collection('geofence')
        //.find({'device':req.params.device,'timestamp':{$gte:start,$lt:end}})
        .find({'device':req.params.device})
        .sort({'timestamp':-1})
        .limit(2)
        .toArray((err, docs) => {
          if (err) console.log(err)
          res.send(docs)
        })
    })

    .listen(3000)
})
module.exports = app;
