import * as authentication from 'feathers-authentication'
import * as jwt from 'feathers-authentication-jwt'

import * as oauth2 from 'feathers-authentication-oauth2'
import * as GoogleStrategy from 'passport-google-oauth20'

export default function() {
  const app = this
  const config = app.get('authentication')

  // Set up authentication with the secret
  app.configure(authentication(config))
  app.configure(jwt())

  app.configure(oauth2({
    ...config.google,
    name: 'google',
    Strategy: GoogleStrategy,
  }))

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  })
}
