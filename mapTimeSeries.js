const flow = require('lodash/fp').flow
const find = require('lodash/fp').find
const filter = require('lodash/fp').filter
const maxBy = require('lodash/fp').maxBy
const minBy = require('lodash/fp').minBy
const groupBy = require('lodash/fp').groupBy
const sortBy = require('lodash/fp').sortBy

const map = require('lodash/fp').map
const moment = require('moment')
const client = require('mongodb').MongoClient
const fs = require('fs')

const minMax = temps => {
  const { changedAt: minTime , controlState: minTemp  } = minBy('changedAt')(temps)
  const { changedAt: maxTime , controlState: maxTemp  } = maxBy('changedAt')(temps)

  const minMax =  { 
    date: moment(temps[0].changedAt).format('YYYY-MM-DD'),
    max: `${moment(maxTime).format('YYYY-MM-DD HH:mm')}, ${maxTemp}`,
    min: `${moment(minTime).format('YYYY-MM-DD HH:mm')}, ${minTemp}`,
  }

  return minMax
}


const convertDocs = docs => {
  
  const temps = flow(
    map(entry => find(['name', 'temperature'])(entry.components)),
    // sortBy(['changedAt']),
    groupBy(doc => moment(doc.changedAt).startOf('day').format()),
    map(minMax)
    // map(day => `
    //     ${moment(day.min.changedAt).format('YYYY-MM-DD HH:mm')}, ${day.min.controlState}
    //     ${moment(day.max.changedAt).format('YYYY-MM-DD HH:mm')}, ${day.max.controlState}
    //     `
    // )
  )(docs)
  
  fs.writeFile('temps.json', JSON.stringify(temps, null, 2))
}

client.connect('mongodb://192.168.1.252:27017/home-js', (err, db) => {
  if (err) {
    console.error(err)
    return
  }
  db.collection('componentstates')
    .find({ _id: { $regex: /^12658677/ } })
    .toArray((err, docs) => {
      if (err) {
        console.error(err)
        return
      }
      // writeStuff(docs)
      convertDocs(docs)
      db.close()
    })
})

const writeStuff = docs => {
  const strDocs = JSON.stringify(docs, null, 2)
  console.log(strDocs)
  fs.writeFile('out.json', strDocs)
}
