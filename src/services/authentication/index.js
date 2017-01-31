'use strict';
const _ = require('lodash');

const authentication = require('feathers-authentication');


module.exports = function () {
  const app = this;

  let config = _.assign({}, app.get('auth'), {
    name: 'auth/local',
    entity: 'user',
    service: 'users',
    usernameField: 'username',
    passwordField: 'password',
  });

  app.configure(authentication(config));
};
