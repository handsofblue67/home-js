'use strict';

// Initializes the `devices` service on path `/devices`
const createService = require('feathers-mongodb');
const hooks = require('./devices.hooks');
const filters = require('./devices.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const id = 'deviceID';
  const mongoClient = app.get('mongoClient');
  const options = { id, paginate };

  // Initialize our service with any options it requires
  app.use('/devices', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('devices');

  mongoClient.then(db => {
    service.Model = db.collection('devices');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
