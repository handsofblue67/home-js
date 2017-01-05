'use strict';

const authentication = require('feathers-authentication');


module.exports = function() {
  const app = this;

  let config = {
    name: 'auth/local', // the name to use when invoking the authentication Strategy
    entity: 'user', // the entity that you're comparing username/password against
    service: 'users', // the service to look up the entity
    usernameField: 'username', // key name of username field
    passwordField: 'password', // key name of password field
};
  

  
  app.configure(authentication(config));
};
