'use strict';
const chat = require('./chat');
const lights = require('./lights');
const todos = require('./todos');
const devices = require('./devices');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(devices);
  app.configure(todos);
  app.configure(lights);
  app.configure(chat);
};
