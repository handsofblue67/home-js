-- file : init.lua

-- if adc.force_init_mode(adc.INIT_ADC) then
--   node.restart()
--   return
-- end
-- print("System voltage (mV):", adc.readvdd33(0))

config = require("config")
settings = require("settings")
app = require("application")
-- if config == false or config.HOST == nil then
--   RC522 = require('nfc')
--   cardReader = require('card-reader')
--   setup = require("setup")
--   cardReader.start()
-- else
  -- if file.open('config.lua', 'r') then
  --   print(file.read())
  --   file.close()
  -- end
  setup = require("setup")
  setup.start()
-- end
