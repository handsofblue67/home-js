'use strict';

// deviceTrigger-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const deviceTriggerSchema = new Schema({
  source: { type: String, ref: 'device', required: true },
  trigger: { 
    operator: { type: String, required: true },
    state: { type: Number, required: true }
  },
  target: { type: String, ref: 'device', required: true },
  targetComponent: { type: String, required: true },
  action: { type: Boolean, required: true },
  updatedAt: { type: Date, 'default': Date.now }
});

const deviceTriggerModel = mongoose.model('deviceTrigger', deviceTriggerSchema);

module.exports = deviceTriggerModel;