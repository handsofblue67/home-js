import * as auth from 'feathers-authentication'
import * as commonHooks from 'feathers-hooks-common'
import * as authHooks from 'feathers-authentication-hooks'

import * as localHooks from 'feathers-authentication-local'

import { HooksObject } from 'feathers-hooks'

const { authenticate } = auth.hooks
const { hashPassword } = localHooks.hooks

const restrict = [
  authenticate('jwt'),
  authHooks.restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
]

export const hooks: HooksObject = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
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
}
