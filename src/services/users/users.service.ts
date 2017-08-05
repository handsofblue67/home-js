// Initializes the `users` service on path `/users`
import * as createService from 'feathers-mongodb'
import { hooks } from './users.hooks'
import filters from './users.filters'

export default function() {
  const app = this
  const paginate = app.get('paginate')
  const id = 'googleId'
  const mongoClient = app.get('mongoClient')
  const options = { id, paginate }

  // Initialize our service with any options it requires
  app.use('/users', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users')

  mongoClient.then(db => {
    service.Model = db.collection('users')
  })

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
