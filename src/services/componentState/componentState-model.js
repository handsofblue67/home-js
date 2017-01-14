'use strict';

// componentState-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const componentStateSchema = new Schema({
  _id: { type: String },
  components: { type: Schema.Types.Mixed }
});

const componentStateModel = mongoose.model('componentState', componentStateSchema);

module.exports = componentStateModel;