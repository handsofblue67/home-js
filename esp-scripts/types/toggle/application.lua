-- file : application.lua
local module = {}
m = nil

local function send_state()
  local status = {
    deviceID = config.ID,
    pinState = pinState,
    timestamp = rtctime.get()
  }
  m:publish(settings.topics.publish.status, cjson.encode(status),0,0)
end

local function toggle_state()
  if pinState == gpio.HIGH then
    pinState = gpio.LOW
  else
    pinState = gpio.HIGH
  end
  gpio.write(outputPin, pinState)
  send_state(pinState)
end

local function init_settings()

  -- initialize pin 1 (gpio15) for output
  module.outputPin=1

  -- initial output pin state
  module.pinState=gpio.LOW

  gpio.mode(outputPin, gpio.OUTPUT)
  gpio.write(outputPin, pinState)

  -- initialize pin 2(gpio04) for input
  buttonPin=2
  gpio.mode(buttonPin, gpio.INPUT)
  gpio.trig(buttonPin, "down", toggle_state)

end

-- Sends my id to the broker for registration
local function register_myself()
  local sub = settings.topics.subscribe
  m:subscribe({[sub.toggle]=0, [sub.settings]=0},function(conn)
    print("Successfully subscribed to data endpoint: " sub.toggle .. ", " sub.settings)
  end)
end

local function alter_settings(data)
  m:publish(settings.topics.publish.settings, cjson.encode(settings),0,0)
end

local function mqtt_start()
  m = mqtt.Client(config.ID, 120)
  -- register message callback beforehand
  m:on("message", function(conn, topic, data)
    if data ~= nil then
      print(topic .. ": " .. data)
      if topic == settings.topics.subscribe.toggle then
        toggle_state()
      elseif topic == settings.topics.subscribe.settings then
        alter_settings(cjson.decode(data))
      end
    end
  end)

  -- Connect to broker
  m:connect(config.HOST, config.PORT, 0, 1, function(con)
    init_settings()
    register_myself()
  end)
end

function module.start()
  mqtt_start()
end

return module
