'use strict';

module.exports = function (app) {
  return function (req, res, next) {
    const body = req.body;

    // Get the user service and `create` a new user
    app.service('users').create({
      username: body.username,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      picture: body.picture,
      admin: body.admin,
    })
    .then(user => res.sendStatus(200))
    .catch(next);
  };
};