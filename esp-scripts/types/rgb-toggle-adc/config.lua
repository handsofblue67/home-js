-- file : config.lua
local module = {}

module.SSID = {}
module.SSID["Stormageddon"]= "WateryWater856"


module.HOST = "192.168.1.2"
module.PORT = 1883
module.ID = node.chipid()

module.STATUS = "/status/" .. module.ID
module.RGB = "/set/" .. module.ID
module.TOGGLE = "/toggle/" .. module.ID
module.SETTINGS = "/settings/" .. module.ID

return module
