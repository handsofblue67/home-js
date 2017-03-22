-- file : application.lua
local module = {}
m = nil

local function syncTime() 
  sntp.sync("pool.ntp.org", function()
    seconds, millis=rtctime.get()
    print(tonumber(tostring(seconds) .. tostring(math.floor(millis/1000))))
  end, print)
end

local function send_state()
  seconds, millis=rtctime.get()
  settings.dateCreated=tonumber(tostring(seconds) .. tostring(math.floor(millis/1000)))
  m:publish(settings.topics.pub.status, cjson.encode(module.status),0,0)
  print(cjson.encode(module.status))
end

local function toggle_state()
  if settings.components[1].controlState == gpio.HIGH then
    settings.components[1].controlState = gpio.LOW
  else
    settings.components[1].controlState = gpio.HIGH
  end
  gpio.write(settings.components[1].number, settings.components[1].controlState)
  send_state()
end

local function alter_settings(topic)
  send_state()
end

local function send_settings()
  m:publish(settings.topics.pub.currentSettings, cjson.encode(settings),0,0)
end

-- Sends my id to the broker for registration
local function register_myself(topics)
  -- sub = settings.topics.subscribe
  m:subscribe({[topics.updateState]=0, [topics.settings]=0, [topics.reqStatus]=0}, function(conn)
    print("Successfully subscribed to data endpoints: " .. cjson.encode(topics) )
    send_settings()
  end)
end

local function mqtt_start(topics)
  m = mqtt.Client(config.ID, 120)
  -- register message callback beforehand
  m:on("message", function(conn, topic, data)
    if data ~= nil then
      if topic == topics.updateState then
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
    register_myself(settings.topics.sub)
    gpio.mode(settings.components[1].pinNumber, gpio.OUTPUT)
    gpio.write(settings.components[1].pinNumber, settings.components[1].controlState)
    tmr.stop(5)
    tmr.alarm(5, 6870947, tmr.ALARM_SEMI, syncTime)
  end)
end

function module.start()
  mqtt_start(settings.topics.sub)
end

return module
