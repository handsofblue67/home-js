// Initializes the `calendars` service on path `/calendars`
import * as createService from 'feathers-mongodb'
import { hooks } from './calendars.hooks'
import filters from './calendars.filters'

export default async function() {
  const app = this
  const paginate = app.get('paginate')
  const id = 'id'
  const mongoClient = app.get('mongoClient')
  const options = { id, paginate }

  // Initialize our service with any options it requires
  app.use('/calendars', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('calendars')

  const db = await mongoClient
  service.Model = db.collection('calendars')

  await service.Model.createIndex({ id: 1 })

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
