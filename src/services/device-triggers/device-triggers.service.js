'use strict';

// Initializes the `deviceTriggers` service on path `/deviceTriggers`
const createService = require('feathers-mongodb');
const hooks = require('./device-triggers.hooks');
const filters = require('./device-triggers.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/deviceTriggers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('deviceTriggers');

  mongoClient.then(db => {
    service.Model = db.collection('device-triggers');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
