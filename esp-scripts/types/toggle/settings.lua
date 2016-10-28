local module = {}

module.type = 'toggle'

module.topics = {
  subscribe = {
    toggle = "/toggle/" .. config.ID,
    settings = "/settings/" ..config.ID
  },
  publish = {
    status = "/status/" .. config.ID,
    settings = "/currentSettings/" .. config.ID
  }
}

return module
