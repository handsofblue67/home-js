'use strict';
const _ = require('lodash');
// const GoogleStrategy = require('passport-google').Strategy;



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

  // let google = {
  //   strategy: GoogleStrategy,
  //   clientID: '423630458653-nig8sgfkjd26rmpcqttkei15jc48pkjh.apps.googleusercontent.com',
  //   clientSecret: '8K-WJklPpLFoHFS1owpFOxg-',
  //   callbackURL: "http://localhost:8082/auth/callback",
  //   permissions: {
  //     scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'] 
  //   }
  // }
   
  // app.get('/auth/success', function(req, res){
  //   console.log(req.body);
  //   res.redirect('/users');
  // })

  app.configure(authentication(config));
};
