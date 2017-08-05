import * as auth from 'feathers-authentication'
import { HooksObject } from 'feathers-hooks'
import * as errors from 'feathers-errors'
import * as commonHooks from 'feathers-hooks-common'

import { omit } from 'lodash'

import trigger from '../../hooks/trigger'

// {
//   _id: '596692a96f9b86001b8116ae',
//     deviceID: '6727399750238208',
//       name: 'kejef',
//         deviceType: 'Test',
//           checkinFreq: null,
//             components: [{ name: 'vedo', controlState: true, type: 'toggle' }],
//               topics:
//   {
//     pub:
//     {
//       status: '/status/6727399750238208',
//         currentSettings: '/currentSettings/6727399750238208'
//     },
//     sub:
//     {
//       reqStatus: '/reqStatus/6727399750238208',
//         settings: '/settings/6727399750238208'
//     }
//   },
//   createdAt: null,
//     updatedAt: 1499899547000,
//       lastSeen: 1499899547000
// }

const push = () => {
  return async hook => {
    console.log(hook.data)
    hook.app.mqttClient.publish(hook.data.topics.sub.settings, JSON.stringify(hook.data.components))
    hook.result = 200
    return hook
  }
}

const removeId = () => {
  return async hook => {
    const data = omit(hook.data, ['_id'])
    return { ...hook, data }
  }
}

export const hooks: HooksObject = {
  before: {
    all: [auth.hooks.authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [
      commonHooks.iff(commonHooks.isProvider('external'), push()), // if update is originating from web client, push to device
      trigger(),
      removeId()
    ],
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
