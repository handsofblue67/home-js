// Initializes the `deviceTriggers` service on path `/deviceTriggers`
import * as createService from 'feathers-mongodb'
import { hooks } from './device-triggers.hooks'
import filters from './device-triggers.filters'

export default function() {
  const app = this
  const paginate = app.get('paginate')
  const mongoClient = app.get('mongoClient')
  const options = { paginate }

  // Initialize our service with any options it requires
  app.use('/deviceTriggers', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('deviceTriggers')

  mongoClient.then(db => {
    service.Model = db.collection('device-triggers')
  })

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
