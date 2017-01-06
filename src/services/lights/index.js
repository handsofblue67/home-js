'use strict';

const service = require('feathers-mongoose');
const lights = require('./lights-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: lights,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/lights', service(options));

  // Get our initialize service to that we can bind hooks
  const lightsService = app.service('/lights');

  // Set up our before hooks
  lightsService.before(hooks.before);

  // Set up our after hooks
  lightsService.after(hooks.after);
};
