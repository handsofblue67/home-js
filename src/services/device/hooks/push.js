'use strict';

const errors = require('feathers-errors');
const commonHooks = require('feathers-hooks-common');

module.exports = function (options) {
  return function (hook) {
    // TODO: test with hard-coded strings!!!
    hook.app.mqttClient.publish(hook.data.topics.sub.settings, JSON.stringify(hook.data.components));
    hook.result = 200;
    return Promise.resolve(hook);
  };
};
