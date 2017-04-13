'use strict';

// Initializes the `calendars` service on path `/calendars`
const createService = require('feathers-mongodb');
const hooks = require('./calendars.hooks');
const filters = require('./calendars.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const id = 'id';
  const mongoClient = app.get('mongoClient');
  const options = { id, paginate };

  // Initialize our service with any options it requires
  app.use('/calendars', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('calendars');

  mongoClient.then(db => {
    service.Model = db.collection('calendars');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
