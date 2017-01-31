'use strict';

// componentState-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const componentStateSchema = new Schema({
  _id: { type: String },
  components: [
    {
      type: { type: String, required: true },
      name: { type: String, required: true },
      controlState: { type: Schema.Types.Mixed },
      changedAt: { type: Date, 'default': Date.now },
      isTimeSeries: { type: Boolean, 'default': false }
    }
  ]
});

const componentStateModel = mongoose.model('componentState', componentStateSchema);

module.exports = componentStateModel;