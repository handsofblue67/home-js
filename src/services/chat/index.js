'use strict';

const service = require('feathers-mongoose');
const chat = require('./chat-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: chat,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/chats', service(options));

  // Get our initialize service to that we can bind hooks
  const chatService = app.service('/chats');

  // Set up our before hooks
  chatService.before(hooks.before);

  // Set up our after hooks
  chatService.after(hooks.after);
};
