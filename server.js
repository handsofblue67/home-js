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
  mqtt.subscribe('test/#')
  mqtt.publish('testRes/server', 'Hello mqtt')
})

mqtt.on('message', (topic, message) => {
  console.log(message.toString())
  mqtt.end()
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
        console.log(chalk.green(JSON.stringify(result, null, 2)))
        res.send(result.insertedId)
      })
    })
})

.get('/devices', (req, res) => {
  dbConnect((db) => {
    db.collection('devices')
      .find({}).toArray((err, docs) => {
        console.log(chalk.green(JSON.stringify(docs, null, 2)))
        res.send(docs)
      })
    })
})

.get('/mcuStates', (req, res) => {
  dbConnect((db) => {
    console.log(chalk.blue(JSON.stringify(req.body, null, 2)))
    db.collection('mcuStates')
      .insertOne(req.body, (err, result) => {
        console.log(chalk.green(JSON.stringify(result, null, 2)))
        res.send(result.insertedId)
      })
    })
})

.post('/publish/:topic', (req, res) => {
  mqtt.publish(`testRes/${req.params.topic}`, req.body.message)
  res.status(200).send('message published')
})

.listen(3000)

module.exports = app;
