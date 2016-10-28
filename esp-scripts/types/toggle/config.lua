-- file : config.lua
local module = {}

module.SSID = {}
module.SSID["Stormageddon"]= "WateryWater856"

-- report on change
settings.checkinFreq = "On Change"

module.HOST = "192.168.1.2"
module.PORT = 1883
module.ID = node.chipid()

return module
