'use strict';

const service = require('feathers-mongoose');
const deviceTrigger = require('./deviceTrigger-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: deviceTrigger,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/deviceTriggers', service(options));

  // Get our initialize service to that we can bind hooks
  const deviceTriggerService = app.service('/deviceTriggers');

  // Set up our before hooks
  deviceTriggerService.before(hooks.before);

  // Set up our after hooks
  deviceTriggerService.after(hooks.after);
};
