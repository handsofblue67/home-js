local module={}

module.deviceID=config.ID
module.name='Christmas Lights'
module.primaryType="digitalOutput"
module.type="toggle"

module.topics={
  sub={
    toggle="/toggle/" .. config.ID,
    settings="/settings/" .. config.ID,
    reqStatus="/reqStatus/" .. config.ID
  },
  pub={
    status="/status/" .. config.ID,
    currentSettings="/currentSettings/" .. config.ID
  }
}

return module
