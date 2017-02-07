local module = {}
----------------------------------------------------------------
-- RC522 RFID Reader for NodeMCU LUA
-- By Ben Jackson

-- This is a port of:
--   https://github.com/ondryaso/pi-rc522        -> Python
--   https://github.com/ljos/MFRC522             -> Arduino

-- to be used with MFRC522 RFID reader and s50 tag (but can work with other tags)
      
local pin_rst = 3                 -- Enable/reset pin
local pin_ss = 4                  -- SS (marked as SDA) pin
local mode_transrec = 0x0C
local mode_reset = 0x0F
local auth_a = 0x60
local reg_tx_control = 0x14
local length = 16
local num_write = 0

local authed = false

local keyA = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF }      --  this is the usual default key (but may not always be)

local function fromhex(str)
    return (str:gsub('..', function (cc)
        return string.char(tonumber(cc, 16))
    end))
end

local function tohex(str)
    return (str:gsub('.', function (c)
        return string.format('%02X', string.byte(c))
    end))
end
--------------------------------------------------------
--  Converts a table of numbers into a HEX string
local function appendHex(t)
  strT = ""
  for i,v in ipairs(t) do
    strT = strT..string.format("%X", t[i])
  end
  strT = fromhex(strT)
  return strT
end

----------------------------------------------------------------------
-- Main
----------------------------------------------------------------------
function module.start()
  -- Initialise the RC522
  spi.setup(1, spi.MASTER, spi.CPOL_LOW, spi.CPHA_LOW, spi.DATABITS_8, 0)
  gpio.mode(pin_rst,gpio.OUTPUT)
  gpio.mode(pin_ss,gpio.OUTPUT)
  gpio.write(pin_rst, gpio.HIGH)      -- needs to be HIGH all the time for the RC522 to work
  gpio.write(pin_ss, gpio.HIGH)       -- needs to go LOW during communications
  RC522.dev_write(0x01, mode_reset)   -- soft reset
  RC522.dev_write(0x2A, 0x8D)         -- Timer: auto; preScaler to 6.78MHz
  RC522.dev_write(0x2B, 0x3E)         -- Timer 
  RC522.dev_write(0x2D, 30)           -- Timer
  RC522.dev_write(0x2C, 0)            -- Timer
  RC522.dev_write(0x15, 0x40)         -- 100% ASK
  RC522.dev_write(0x11, 0x3D)         -- CRC initial value 0x6363
  -- turn on the antenna
  current = RC522.dev_read(reg_tx_control)
  if bit.bnot(bit.band(current, 0x03)) then
      RC522.set_bitmask(reg_tx_control, 0x03)
  end
  configuration = {}

  print("RC522 Firmware Version: 0x"..string.format("%X", RC522.getFirmwareVersion()))

  tmr.alarm(0, 100, tmr.ALARM_AUTO, function()

      isTagNear, cardType = RC522.request()

      if isTagNear == true then
          tmr.stop(0)

          err, serialNo = RC522.anticoll()
          err, sak = RC522.select_tag(serialNo)

          if err == false then
          -- print("Tag selected successfully.  SAK: 0x"..string.format("%X", sak))
        
            for i = 12,14 do
                err = RC522.card_auth(auth_a, i, keyA, serialNo)     --  Auth the "A" key.  If this fails you can also auth the "B" key
                if err then 
                    print("ERROR Authenticating block "..i) 
                else 
                -- Read card data
                    err, tagData = RC522.readTag(i)
                    if not err then
                      if i == 12 then
                        configuration.SSID = appendHex(tagData)
                        print(configuration.SSID)
                      elseif i == 13 then
                        configuration.PSK = appendHex(tagData)
                        print(configuration.PSK)
                      elseif i == 14 then
                        configuration.HOST = appendHex(tagData)
                        print(configuration.HOST)
                      end
                    end
                end
            end
          else
            print("ERROR Selecting tag")
          end
          print(" ")
      
          -- halt tag and get ready to read another.
          buf = {}
          buf[1] = 0x50  --MF1_HALT
          buf[2] = 0
          crc = RC522.calculate_crc(buf)
          table.insert(buf, crc[1])
          table.insert(buf, crc[2])
          err, back_data, back_length = RC522.card_write(mode_transrec, buf)
          RC522.clear_bitmask(0x08, 0x08)    -- Turn off encryption
          if configuration.SSID ~= nil and configuration.PSK ~= nil and configuration.HOST ~= nil then
            file.remove("config.lua")
            if file.open("config.lua", "w") then
              file.write(string.format("local module = {}\nmodule.SSID = {}\nmodule.SSID[\"%s\"]=\"%s\"\nmodule.HOST = \"%s\"\nmodule.PORT = 1883\nmodule.ID = node.chipid()\nreturn module", configuration.SSID, configuration.PSK, configuration.HOST))
              file.close()
              node.restart()
            end
          end
      end
  end)  -- timer
end
return module