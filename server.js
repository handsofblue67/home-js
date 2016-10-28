const MongoClient = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mqtt = require('mqtt').connect('mqtt://broker')
const chalk = require('chalk')
const app = express()

mqtt.on('connect', () => {
  mqtt.subscribe('/status/#')
  mqtt.subscribe('/currentSettings/#')
})

MongoClient.connect('mongodb://db', (err, db) => {

  mqtt.on('message', (topic, message) => {
    db.collection('mcuStates')
      .insertOne(JSON.parse(message.toString()), (err, result) => {
        if (err) console.log(err)
        console.log(`inserted ${result.insertedId}`)
        console.log(JSON.stringify(JSON.parse(message.toString())))
      })
  })
  
  app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(require('morgan')('dev'))

    .use(express.static(path.join(__dirname, 'dist')))

    .get('/devices', (req, res) => {
      db.collection('mcuStates')
        .distinct('deviceID', (err, results) => {
          if (err) console.log(err)
          res.send(results)
        })
    })

    .get('/mcuStates/:deviceID', (req, res) => {
      console.log(req.params.id)
      db.collection('mcuStates')
        .find({ 'deviceID': +req.params.deviceID })
        // .limit(100)
        .toArray((err, docs) => {
          if (err) console.log(err)
          console.log(JSON.stringify(docs, null, 2))
          res.send(docs)
        })
    })

    .post('/publish', (req, res) => {
      mqtt.publish(`${req.body.topic}`, req.body.message)
      res.status(200).send('message published')
    })

    .delete('/mcuState/:id', (req, res) => {
      db.collection('mcuStates')
        .deleteOne({ _id: new objectID(req.params.id) }, (err, result) => {
          if (err) console.log(err)
          res.send(result)
        })
    })

    .get('/broker', (req, res) => {
      res.send('mqtt//broker')
    })

    .listen(3000)
})
module.exports = app;