'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const authHooks = require('feathers-authentication-hooks');

const getEvents = require('../../hooks/get-events');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      authHooks.queryWithCurrentUser({idField: 'googleId'}),
      getEvents()
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
