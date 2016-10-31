local module={}

module.deviceID=config.ID
module.name=config.ID
module.primaryType='analogInput'

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
