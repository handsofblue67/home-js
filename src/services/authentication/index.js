'use strict';

const authentication = require('feathers-authentication');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const _ = require('lodash');

module.exports = function () {
  const app = this;

  let config = _.assign({}, app.get('auth'), {
    name: 'auth/local',
    entity: 'user',
    service: 'users',
    usernameField: 'username',
    passwordField: 'password',
  });

  config.facebook.strategy = FacebookStrategy;
  config.facebook.tokenStrategy = FacebookTokenStrategy;
  config.google.strategy = GoogleStrategy;
  config.google.tokenStrategy = GoogleTokenStrategy;

  app.configure(authentication(config));
};
