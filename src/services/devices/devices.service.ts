// Initializes the `devices` service on path `/devices`
import * as createService from 'feathers-mongodb'
import { hooks } from './devices.hooks'
import filters from './devices.filters'

export default async function() {
  const app = this
  const paginate = app.get('paginate')
  const id = 'deviceID'
  const mongoClient = app.get('mongoClient')
  const options = { id, paginate }

  // Initialize our service with any options it requires
  app.use('/devices', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('devices')

  const db = await mongoClient
  service.Model = db.collection('devices')

  await service.Model.createIndex({ deviceID: 1 })

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}