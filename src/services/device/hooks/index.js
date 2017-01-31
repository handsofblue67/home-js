'use strict';

const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const push = require('./push');
const commonHooks = require('feathers-hooks-common');

const debug = function(options) {
  return function(hook) {
    hook.app.logger.info(JSON.stringify(hook.data));
    hook.app.logger.info(hook.data.topics.sub.settings);
    return Promise.resolve(hook);
  };
};

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    // debug()
  ],
  find: [],
  get: [],
  create: [],
  update: [ 
    debug(),
    commonHooks.iff(commonHooks.isProvider('external'), push())
  ],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
