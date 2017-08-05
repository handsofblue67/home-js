import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as compress from 'compression'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as bodyParser from 'body-parser'

import * as feathers from 'feathers'
import * as configuration from 'feathers-configuration'
import * as hooks from 'feathers-hooks'
import * as rest from 'feathers-rest'
import * as socketio from 'feathers-socketio'

import middleware from './middleware'
import services from './services'
import { appHooks } from './app.hooks'
import authentication from './authentication'
import mongodb from './mongodb'

const app: feathers.Application = feathers()

// Load app configuration
app.configure(configuration())
// Enable CORS, security, compression, favicon and body parsing
app.use(cors())
app.use(helmet())
app.use(compress())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(favicon(path.join(app.get('public'), 'assets', 'favicon.ico')))
// Host the public folder
app.use('/', feathers.static(app.get('public')))
app.use('/calendar', feathers.static(app.get('public')))
app.use('/devices', feathers.static(app.get('public')))

// Set up Plugins and providers
app.configure(hooks())
app.configure(mongodb)
app.configure(rest())
app.configure(socketio())

app.configure(authentication)

// Set up our services (see `services/index.js`)
app.configure(services)
// Configure middleware (see `middleware/index.js`) - always has to be last
app.configure(middleware)
app.hooks(appHooks)

export { app }
