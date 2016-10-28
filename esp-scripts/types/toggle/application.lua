-- file : application.lua
local module = {}
m = nil

local function send_status()
  local status = {
    deviceID = config.ID,
    pinState = module.pinState,
    timestamp = rtctime.get()
  }
  m:publish(settings.topics.publish.status, cjson.encode(status),0,0)
  print(cjson.encode(status))
end

local function toggle_state()
  if module.pinState == gpio.HIGH then
    module.pinState = gpio.LOW
  else
    module.pinState = gpio.HIGH
  end
  gpio.write(settings.outputPin, module.pinState)
  send_status()
end

local function init_settings()

  -- initial output pin state
  module.pinState=gpio.LOW

  gpio.mode(settings.outputPin, gpio.OUTPUT)
  gpio.write(settings.outputPin, module.pinState)

  gpio.mode(settings.inputPin, gpio.INPUT)
  gpio.trig(settings.inputPin, "down", toggle_state)

end

-- Sends my id to the broker for registration
local function register_myself(topics)
  -- sub = settings.topics.subscribe
  m:subscribe({[topics.toggle]=0, [topics.settings]=0, [topics.reqStatus]=0},function(conn)
    print("Successfully subscribed to data endpoint: " .. topics.toggle .. ", " .. topics.settings .. ", " .. topics.reqStatus)
  end)
end

local function alter_settings(topic)
  m:publish(topic, cjson.encode(settings),0,0)
end

local function mqtt_start(topics)
  m = mqtt.Client(config.ID, 120)
  -- register message callback beforehand
  m:on("message", function(conn, topic, data)
    if data ~= nil then
      print(topic .. ": " .. data)
      if topic == topics.toggle then
        print(topic)
        toggle_state()
      elseif topic == topics.settings then
        alter_settings(settings.topics.publish.currentSettings)
      elseif topic == topics.reqStatus then
        send_status()
      end
    end
  end)

  -- Connect to broker
  m:connect(config.HOST, config.PORT, 0, 1, function(con)
    init_settings()
    register_myself(settings.topics.subscribe)
  end)
end

function module.start()
  mqtt_start(settings.topics.subscribe)
end

return module
