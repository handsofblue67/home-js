const MongoClient = require('mongodb').MongoClient
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mqtt = require('mqtt').connect('mqtt://broker')
const chalk = require('chalk')

function dbConnect(callback) {
  MongoClient.connect('mongodb://db', (err, db) => {
    callback(db)
    db.close()
  })
}

mqtt.on('connect', () => {
  mqtt.subscribe('/status/+/state')
})

mqtt.on('message', (topic, message) => {
  dbConnect(db => {
    db.collection('mcuStates')
      .insertOne(JSON.parse(message.toString()), (err, result) => {
        console.log(result.insertedId)
      })
  })
  console.log(message.toString())
  // mqtt.end()
})

const app = express()

.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))
.use(require('morgan')('dev'))

.use(express.static(path.join(__dirname, 'dist')))

.post('/devices', (req, res) => {
  dbConnect((db) => {
    console.log(chalk.blue(JSON.stringify(req.body, null, 2)))
    db.collection('devices')
      .insertOne(req.body, (err, result) => {
        res.send(result.insertedId)
      })
    })
})

.get('/devices', (req, res) => {
  dbConnect((db) => {
    db.collection('devices')
      .find({}).toArray((err, docs) => {
        res.send(docs)
      })
    })
})

.get('/mcuStates', (req, res) => {
  dbConnect((db) => {
    db.collection('mcuStates')
      .find({}).toArray((err, docs) => {
        res.send(docs)
      })
    })
})

.post('/publish', (req, res) => {
  mqtt.publish(`${req.body.topic}`, req.body.message)
  res.status(200).send('message published')
})

.listen(3000)

module.exports = app;
