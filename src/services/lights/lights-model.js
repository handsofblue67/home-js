'use strict';

// lights-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lightsSchema = new Schema({
  _id: { type: String, 'default': () => `${deviceID}_${timestamp}` },
  deviceID: { type: String, required: true },
  timestamp: { type: Date },
  timeSeries: { type: Boolean },
  dimmable: { type: Boolean, 'default': false },
  purpose: { type: String },
  state: { type: Boolean }
});

const lightsModel = mongoose.model('lights', lightsSchema);

module.exports = lightsModel;