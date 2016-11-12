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
let http = require('http').Server(app)
let io = require('socket.io')(http)
const jwt = require('express-jwt')
const cors = require('cors')

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

const authCheck = jwt({
  secret: new Buffer('US8c50SXMeTQH8LD0axQj3prPHKDok0W', 'base64'),
  audience: 'handsofblue67.auth0.com'
})

mqtt.on('connect', () => {
  mqtt.subscribe('/status/#')
  mqtt.subscribe('/currentSettings/#')
  mqtt.subscribe('$SYS/#')
  mqtt.subscribe('#')

  MongoClient.connect('mongodb://db', (err, db) => {
    if (err) console.error('error connecting to mongodb ' + err)

    io.on('connection', socket => {
      console.log('user connected')

      // on web client disconnect
      socket.on('disconnect', () => console.log('user disconnected'))

      // on toggle from web client
      socket.on('toggle', pub => mqtt.publish(pub.topic, pub.message))

    })

      mqtt.on('message', (topic, message) => {
        // message is a device defintion or a devices status report
        io.emit('log', { type: 'event', event: {topic: topic, message: JSON.parse(message.toString()) || message}})
        settingsRegExp = new RegExp(/currentSettings\/.*/)
        statusRegExp = new RegExp(/status\/.*/)
        console.log(topic)

        if (settingsRegExp.test(topic)) updateDevice(JSON.parse(message.toString())) 

        else if (statusRegExp.test(topic)) addStatus(JSON.parse(message.toString()))
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
                .updateOne({ 'deviceID': status.deviceID }, { $set: status }, { upsert: true }, () => {
                  io.emit('stateChange', { type: 'state', status: status })
                })
              break
            case 'digitalInput':
              db.collection('statuses').insertOne(status, () => {
                io.emit('digitalInputChange', { type: 'state', status: status })
              })
              break
            case 'analogOutput':
              db.collection('statuses')
                .updateOne({ 'deviceID': status.deviceID }, { $set: status }, { upsert: true }, () => {
                  io.emit('analogStateChange', { type: 'state', status: status })
              })
            case 'analogInput':
              db.collection('statuses').insertOne(status, () => {
                io.emit('analogInputChange', { type: 'state', status: status })
              })
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
      .use('/debug', express.static(path.join(__dirname, 'dist')))
      .use('/home', express.static(path.join(__dirname, 'dist')))
      .use(cors())

      .get('/api/devices/:type', authCheck, (req, res) => {
        db.collection('devices')
          .find({ 'primaryType': req.params.type })
          .toArray((err, docs) => {
            if (err) console.log(err)
            res.send(docs)
          })
      })

      .get('/api/devices', authCheck, (req, res) => {
        db.collection('devices')
          .find({}).toArray((err, docs) => {
            res.send(docs)
          })
      })

      .get('/api/statuses/:deviceID', authCheck,  (req, res) => {
        db.collection('statuses')
      	  .aggregate([
    	      {$match:{'deviceID':+req.params.deviceID}},
    	      {$sample:{size:500}},
            {$sort:{timestamp:1}}
          ])
          .toArray((err, docs) => {
      	    if (err) console.log(err)
      	    res.send(docs)
  	      })
       })

      .post('/api/publish', authCheck, (req, res) => {
        mqtt.publish(`${req.body.topic}`, req.body.message)
        res.status(200).send('message published')
      })

      .delete('/api/statuses/:id', authCheck, (req, res) => {
        db.collection('statuses')
          .deleteOne({ _id: new objectID(req.params.id) }, (err, result) => {
            if (err) console.log(err)
            res.send(result)
          })
      })

      .get('/api/broker', authCheck, (req, res) => {
        res.send('mqtt//broker')
      })

      .get('/api/geofence', authCheck, (req, res) => {
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

      .get('/api/geofence/:device', authCheck, (req, res) => {
        const start = moment().startOf('day')
        const end = moment().endOf('day')
        db.collection('geofence')
          //.find({'device':req.params.device,'timestamp':{$gte:start,$lt:end}})
          .find({ 'device': req.params.device })
          .sort({ 'timestamp': -1 })
          .limit(2)
          .toArray((err, docs) => {
            if (err) console.log(err)
            res.send(docs)
          })
      })
    // app.listen(3000)
    http.listen(3000)
  })
})

// module.exports = app;
