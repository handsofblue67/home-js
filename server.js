const MongoClient = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID
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
  mqtt.subscribe('/status/#')
})

mqtt.on('message', (topic, message) => {
  dbConnect(db => {
    db.collection('mcuStates')
      .insertOne(JSON.parse(message.toString()), (err, result) => {
      })
  })
})

const app = express()

.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))
.use(require('morgan')('dev'))

.use(express.static(path.join(__dirname, 'dist')))

.get('/devices', (req, res) => {
  dbConnect((db) => {
    db.collection('mcuStates')
      .distinct('ID', (err, results) => {
        res.send(results)
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

.get('/mcuStates/:id', (req, res) => {
  dbConnect((db) => {
    db.collection('mcuStates')
      .find({id: req.params.id}).toArray((err, docs) => {
        res.send(docs)
      })
    })
})

.post('/publish', (req, res) => {
  mqtt.publish(`${req.body.topic}`, req.body.message)
  res.status(200).send('message published')
})

.delete('/mcuState/:id', (req, res) => {
  dbConnect(db => {
    db.collection('mcuStates')
      .deleteOne({_id: new objectID(req.params.id)}, (err, result) => {
        res.send(result)
      })
  })
})

.listen(3000)

module.exports = app;
