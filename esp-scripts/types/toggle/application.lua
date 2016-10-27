-- file : application.lua
local module = {}
m = nil

local function send_state()
  m:publish(config.ENDPOINT .. config.ID .. "/state", cjson.encode(settings),0,0)
end

local function toggle_state()
  if module.pinState == gpio.HIGH then
    module.pinState = gpio.LOW
  else
    module.pinState = gpio.HIGH
  end
  gpio.write(module.outputPin, module.pinState)
  send_state()
end

local function init_settings()
  module.deviceID = config.ID
  -- initial output pin state
  module.pinState=gpio.LOW

  -- initialize pin 1 (gpio15) for output
  module.outputPin=1
  gpio.mode(module.outputPin, gpio.OUTPUT)
  gpio.write(module.outputPin, module.pinState)

  -- initialize pin 2(gpio04) for input
  module.buttonPin=2
  gpio.mode(module.buttonPin, gpio.INPUT)
  gpio.trig(module.buttonPin, "down", toggle_state)

  -- report on change
  settings.checkinFreq = "On Change"
end

local function adjust_rgb(data)
  settings.RGB=data.RGB
  pwm.setduty(settings.RGB.RED.PIN, settings.RGB.RED.DUTY)
  pwm.setduty(settings.RGB.GREEN.PIN, settings.RGB.GREEN.DUTY)
  pwm.setduty(settings.RGB.BLUE.PIN, settings.RGB.BLUE.DUTY)
  pwm.setclock(settings.RGB.RED.PIN, settings.RGB.RED.CLOCK)
  pwm.setclock(settings.RGB.GREEN.PIN, settings.RGB.GREEN.CLOCK)
  pwm.setclock(settings.RGB.BLUE.PIN, settings.RGB.BLUE.CLOCK)
end

-- Sends my id to the broker for registration
local function register_myself()
  m:subscribe({[config.ENDPOINT .. config.ID  .. "/toggle"]=0, [config.ENDPOINT .. config.ID .. "/rgb"]=0},function(conn)
    print("Successfully subscribed to data endpoint: " .. config.ENDPOINT .. config.ID .. "/toggle")
  end)
end

local function mqtt_start()
  m = mqtt.Client(config.ID, 120)
  -- register message callback beforehand
  m:on("message", function(conn, topic, data)

    if data ~= nil then
      print(topic .. ": " .. data)
      -- if topic == config.ENDPOINT .. config.ID .. "/toggle" then
        -- toggle_state()
      -- end
    end
  end)

  -- Connect to broker
  m:connect(config.HOST, config.PORT, 0, 1, function(con)
    init_settings()
    register_myself()
    -- tmr.stop(6)
    -- tmr.alarm(6, settings.checkinFreq, 1, send_state)
  end)
end

function module.start()
  mqtt_start()
end

return module
