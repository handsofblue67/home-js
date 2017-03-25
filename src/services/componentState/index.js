'use strict';

const service = require('feathers-mongoose');
const componentState = require('./componentState-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: componentState,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/componentStates', service(options));

  // Get our initialize service to that we can bind hooks
  const componentStateService = app.service('/componentStates');

  // Set up our before hooks
  componentStateService.before(hooks.before);

  // Set up our after hooks
  componentStateService.after(hooks.after);
};
