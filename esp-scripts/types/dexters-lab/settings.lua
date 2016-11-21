local module={}

module.deviceID=config.ID
module.name='Dexter\'s Lab'
module.primaryType='digitalInput'

module.checkinFreq='On Change'

module.topics={
  sub={
    settings="/settings/" .. config.ID,
    reqStatus="/reqStatus/" .. config.ID
  },
  pub={
    status="/status/" .. config.ID,
    currentSettings="/currentSettings/" .. config.ID
  }
}

return module
