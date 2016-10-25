const MongoClient = require('mongodb').MongoClient
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mqtt = require('mqtt')

console.log('db')

MongoClient.connect('mongodb://db', (err, db) => {
  console.log('connected to mongodb')
  db.close()
})

const app = express()

.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))
.use(logger('dev'))

.listen(3000)

module.exports = app;
