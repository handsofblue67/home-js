// Initializes the `alexa` service on path `/alexa`
import * as createService from 'feathers-mongodb'
import { hooks } from './alexa.hooks'
import filters from './alexa.filters'

export default async function() {
  const app = this
  const paginate = app.get('paginate')
  const id = 'deviceID'
  const mongoClient = app.get('mongoClient')
  const options = { id, paginate }

  // Initialize our service with any options it requires
  app.use('/alexa', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('alexa')

  const db = await mongoClient
  service.Model = db.collection('alexa')

  await service.Model.createIndex({ deviceID: 1 })

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
