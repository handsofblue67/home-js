'use strict';

const service = require('feathers-mongoose');
const device = require('./device-model');
const hooks = require('./hooks');

module.exports = function () {
  const app = this;

  const options = {
    Model: device,
    id: 'deviceID',
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/devices', service(options));

  // Get our initialize service to that we can bind hooks
  const deviceService = app.service('/devices');

  // Set up our before hooks
  deviceService.before(hooks.before);

  // Set up our after hooks
  deviceService.after(hooks.after);
}
