-- file : application.lua
local module = {}
m = nil

local function send_status()
  seconds, millis=rtctime.get()
  settings.dateCreated=tonumber(tostring(seconds) .. tostring(math.floor(millis/1000)))
  m:publish(settings.topics.pub.status, cjson.encode(settings),0,0)
  print(cjson.encode(settings))
end

local function toggle_state()
  settings.components.light1.controlState = if settings.components.lights.controlState == gpio.HIGH
    then gpio.LOW 
    else gpio.HIGH 
  end
  gpio.write(settings.components.light1.pinNumber, settings.components.light1.controlState)
  send_status()
end

local function init_settings()
  print(tostring(cjson.encode(settings)))
  gpio.mode(settings.components.light1.pinNumber, gpio.OUTPUT)
  gpio.write(settings.components.light1.pinNumber, settings.components.light1.controlState)
end

local function alter_settings(topic)
  send_settings()
end

local function send_settings()
  m:publish(settings.topics.pub.currentSettings, cjson.encode(settings),0,0)
end

-- Sends my id to the broker for registration
local function register_myself(topics)
  -- sub = settings.topics.subscribe
  m:subscribe({[topics.toggle]=0, [topics.settings]=0, [topics.reqStatus]=0},function(conn)
    print("Successfully subscribed to data endpoints: " .. cjson.encode(topics) )
    send_settings()
  end)
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
        alter_settings(settings.topics.pub.currentSettings)
      elseif topic == topics.reqStatus then
        send_status()
      end
    end
  end)

  -- Connect to broker
  m:connect(config.HOST, config.PORT, 0, 1, function(con)
    init_settings()
    register_myself(settings.topics.sub)
  end)
end

function module.start()
  mqtt_start(settings.topics.sub)
end

return module
