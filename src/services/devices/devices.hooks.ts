import * as auth from 'feathers-authentication'
import { HooksObject } from 'feathers-hooks'

import trigger from '../../hooks/trigger'

export const hooks: HooksObject = {
  before: {
    all: [ auth.hooks.authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [trigger()],
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
};
