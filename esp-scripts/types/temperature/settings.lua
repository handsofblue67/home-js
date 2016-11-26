local module={}

module.deviceID=config.ID
module.name='Bedroom DHT'
module.primaryType='digitalInput'

module.checkinFreq=60000

module.topics={
  sub={
    settings="/settings/" ..config.ID,
    reqStatus="/reqStatus/" ..config.ID
  },
  pub={
    status="/status/" .. config.ID,
    currentSettings="/currentSettings/" .. config.ID
  }
}

return module
