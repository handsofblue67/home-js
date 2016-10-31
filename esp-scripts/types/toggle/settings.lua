local module={}

module.deviceID=config.ID
module.name=config.ID
module.primaryType="digitalOutput"

module.topics={
  sub={
    toggle="/toggle/" .. config.ID,
    settings="/settings/" ..config.ID,
    reqStatus="/reqStatus/" ..config.ID
  },
  pub={
    status="/status/" .. config.ID,
    currentSettings="/currentSettings/" .. config.ID
  }
}

return module
