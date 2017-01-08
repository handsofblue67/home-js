'use strict';

// devices-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devicesSchema = new Schema({
  deviceID: { type: String, required: true },
  name: { type: String },
  primaryType: { type: String },
  checkinFreq: { type: Number },
  deviceType: { type: String },
  topics: {
    'sub': {
      'settings': { type: String, 'default': () => `/settings/${deviceID}` },
      'reqStatus': { type: String, 'default': () => `/reqStatus/${deviceID}` }
    },
    'pub': {
      'status': { type: String, 'default': () => `/status/${deviceID}` },
      'currentSettings': { type: String, 'default': () => `/currentSettings/${deviceID}` }
    }
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const devicesModel = mongoose.model('devices', devicesSchema);

module.exports = devicesModel;