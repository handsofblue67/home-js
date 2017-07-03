'use strict'

// Initializes the `componentStates` service on path `/componentStates`
import * as createService from 'feathers-mongodb'
import { hooks } from './component-states.hooks'
import filters from './component-states.filters'

export default function() {
  const app = this
  const paginate = app.get('paginate')
  const mongoClient = app.get('mongoClient')
  const options = { paginate }

  // Initialize our service with any options it requires
  app.use('/componentStates', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('componentStates')

  mongoClient.then(db => {
    service.Model = db.collection('component-states')
  })

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
