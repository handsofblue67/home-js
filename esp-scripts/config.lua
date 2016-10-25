-- file : config.lua
local module = {}

module.SSID = {}
module.SSID["Stormageddon"]= "WateryWater856"


module.HOST = "192.168.1.3"
module.PORT = 1883
module.ID = node.chipid()

module.ENDPOINT = "/test/"

return module