import * as auth from 'feathers-authentication'
import * as authHooks from 'feathers-authentication-hooks'
import { HooksObject } from 'feathers-hooks'

import getEvents from '../../hooks/get-events'

export const hooks: HooksObject = {
  before: {
    all: [ auth.hooks.authenticate('jwt') ],
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
}
