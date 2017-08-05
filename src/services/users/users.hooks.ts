import * as auth from 'feathers-authentication'
import * as commonHooks from 'feathers-hooks-common'
import * as authHooks from 'feathers-authentication-hooks'
import { HooksObject } from 'feathers-hooks'

// const getCalendarData = require('../../hooks/get-calendar-data');

const restrict = [
  auth.hooks.authenticate('jwt'),
  authHooks.restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
]

export const hooks: HooksObject = {
  before: {
    all: [],
    find: [ auth.hooks.authenticate('jwt') ],
    get: [ ...restrict ],
    create: [],
    update: [ ...restrict ],
    patch: [ ...restrict ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      ),
    ],
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
};
