-- file : init.lua
if adc.force_init_mode(adc.INIT_ADC) then
  node.restart()
  return
end
print("System voltage (mV):", adc.readvdd33(0))

app = require("application")
config = require("config")
setup = require("setup")
settings = require("settings")

setup.start()
