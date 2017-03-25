'use strict';

// device-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  deviceID: { type: String, required: true, unique: true },
  name: { type: String },
  checkinFreq: { type: Number },
  deviceType: { type: String },
  components: [
    {
      type: { type: String },
      name: { type: String },
      controlState: { type: Schema.Types.Mixed },
      changedAt: { type: Date, 'default': Date.now },
      isTimeSeries: { type: Boolean, 'default': false },
      units: { type: String }
    }
  ],
  topics: {
    sub: {
      settings: { type: String },
      reqStatus: { type: String }
    },
    pub: {
      status: { type: String },
      currentSettings: { type: String }
    }
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const deviceModel = mongoose.model('device', deviceSchema);

module.exports = deviceModel;

// let dev = {
//   "deviceID": "testdevice",
//   "name": "Test Device",
//   "checkinFreq": 6000000,
//   "deviceType": "Test",
//   "components": {
//     "Test Component 1": {
//       "type": "toggle",
//       "controlState":  false,
//     }
//   },
//   "topics": {
//     "sub": {
//       "settings": "/settings/testdevice",
//       "reqStatus": "/reqStatus/testdevice"
//     },
//     "pub": {
//       "currentSettings": "/currentSettings/testdevice",
//       "status": "/status/testdevice"
//     }
//   }
// }
