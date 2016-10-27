local module = {} 

module.type = 'sensor'

module.checkinFreq = 60000

module.subscriptions = {
  config.settings
}

return module