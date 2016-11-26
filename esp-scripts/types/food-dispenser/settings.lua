local module={}

module.deviceID=config.ID
module.name='food_dispensor'
module.primaryType="digitalOutput"

module.topics={
  sub={
    update="/update/" .. config.ID,
    settings="/settings/" .. config.ID,
    reqStatus="/reqStatus/" .. config.ID
  },
  pub={
    status="/status/" .. config.ID,
    currentSettings="/currentSettings/" .. config.ID
  }
}

return module
