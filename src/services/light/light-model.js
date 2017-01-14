'use strict';

// light-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lightSchema = new Schema({
  deviceID: { type: String, required: true },
  timestamp: { type: Date },
  timeSeries: { type: Boolean },
  dimmable: { type: Boolean, 'default': false },
  purpose: { type: String },
  state: { type: Boolean }
});

const lightModel = mongoose.model('light', lightSchema);

module.exports = lightModel;