'use strict';

const service = require('feathers-mongoose');
const light = require('./light-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: light,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/lights', service(options));

  // Get our initialize service to that we can bind hooks
  const lightService = app.service('/lights');

  // Set up our before hooks
  lightService.before(hooks.before);

  // Set up our after hooks
  lightService.after(hooks.after);
};
