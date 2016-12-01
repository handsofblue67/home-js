local module={}

module.deviceID=config.ID
module.name='Livingroom DHT'
module.primaryType='digitalInput'
module.type='dht11'

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
