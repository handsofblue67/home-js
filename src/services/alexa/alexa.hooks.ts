import { HooksObject } from 'feathers-hooks'
import * as errors from 'feathers-errors'
import * as commonHooks from 'feathers-hooks-common'

import { omit } from 'lodash'

import trigger from '../../hooks/trigger'

const push = () => {
  return async hook => {
    // hook.service.find({name: })
    hook.app.mqttClient.publish(hook.data.topics.sub.settings, JSON.stringify(hook.data.components))
    hook.result = 200
    return hook
  }
}

export const hooks: HooksObject = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [ push() ],
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
