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
const jwt = require('jsonwebtoken')
const config = require('./jwt-config')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

app.set('superSecret', config.secret)

let socketUsers = {}

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

mqtt.on('connect', () => {
  mqtt.subscribe('/status/#')
  mqtt.subscribe('/currentSettings/#')
  mqtt.subscribe('$SYS/#')
  mqtt.subscribe('#')

  MongoClient.connect('mongodb://db', (err, db) => {
    if (err) console.error('error connecting to mongodb ' + err)

    io.on('connection', socket => {
      console.log('user connected')

      socket.on('join', data => {
        socket.join(data.username)
        db.collection('chat')
          .find({})
          .sort({ 'timestamp': -1 })
          .limit(100)
          .toArray((err, docs) => {
            if (err) console.log(err)
            io.sockets.in(data.username).emit('init', docs)
          })
      })

      socket.on('joinFoodDispenser', data => {
        socket.join(data.username)
        db.collection('statuses')
          .find({deviceID: 'food_dispenser'}, (err, device) => {
            if (err) console.log(err)
            console.log(JSON.stringify(data, null, 2))
            io.sockets.in(data.username).emit('initFoodDispenser', device)
          })
      })

      socket.on('changeFoodDispenserStatus', pub => mqtt.publish(pub.topic, pub.message))

      // on web client disconnect
      socket.on('disconnect', () => console.log('user disconnected'))

      // on toggle from web client
      socket.on('toggle', pub => mqtt.publish(pub.topic, pub.message))

      // on incoming chat message
      socket.on('addMessage', message => {
        message = JSON.parse(message)
        db.collection('chat').insertOne(message, () => {
          io.emit('newMessage', message)
        })
      })

    })

    mqtt.on('message', (topic, message) => {
      // message is a device defintion or a devices status report
      io.emit('log', { type: 'event', event: { topic: topic, message: message.toString() } })
      settingsRegExp = new RegExp(/currentSettings\/.*/)
      statusRegExp = new RegExp(/status\/.*/)

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
      .use('/chat', express.static(path.join(__dirname, 'dist')))
      .use('/login', express.static(path.join(__dirname, 'dist')))

      .post('/api/authenticate', (req, res) => {
        db.collection('users').findOne({ username: req.body.username }, (err, user) => {
          if (err) console.log(err)
          console.log('got user from database')

          if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' })
          } else if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
              if (err) console.log(err)

              if (isMatch === false) {
                res.json({ success: false, message: 'Authentication failed. Wrong password' })
              } else {
                const token = jwt.sign(user, app.get('superSecret'), {
                  expiresIn: '7d'
                })
                res.json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token,
                  picture: user.picture,
                  firstName: user.firstName,
                  lastName: user.lastName,
                })
              }
            })
          }
        })
      })

  .post('/api/geofence', auth, (req, res) => {
    db.collection('geofence').insertOne(req.body)
    res.status(200).send('geofence event saved')
  })

  .use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (token) {
      jwt.verify(token, app.get('superSecret'), (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' })
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      })
    }
  })

  .get('/api/users', (req, res) => {
    db.collection('users').find({}).toArray((err, users) => {
      res.json(users)
    })
  })

  .get('/api/devices/:type', (req, res) => {
    db.collection('devices')
      .find({ 'primaryType': req.params.type })
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
      .aggregate([
        { $match: { 'deviceID': +req.params.deviceID } },
        { $sample: { size: 500 } },
        { $sort: { timestamp: 1 } }
      ])
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

  .get('/api/geofence/:device', (req, res) => {
    const start = moment().startOf('day')
    const end = moment().endOf('day')
    db.collection('geofence')
      .find({ 'device': req.params.device })
      .sort({ 'timestamp': -1 })
      .limit(2)
      .toArray((err, docs) => {
        if (err) console.log(err)
        res.send(docs)
      })
  })

  .get('/api/chat', (req, res) => {
    db.collection('chat')
      .find({})
      .sort({ 'timestamp': -1 })
      .limit(1000)
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
