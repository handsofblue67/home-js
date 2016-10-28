local module = {}

module.deviceID = config.ID
module.name = config.ID
module.type = "toggle"

module.outputPin=1
module.inputPin=2

module.topics = {
  subscribe = {
    toggle = "/toggle/" .. config.ID,
    settings = "/settings/" ..config.ID,
    reqStatus = "/reqStatus/" ..config.ID
  },
  publish = {
    status = "/status/" .. config.ID,
    currentSettings = "/currentSettings/" .. config.ID
  }
}

return module
