-- file : application.lua
local module = {}
m = nil

local function send_status()
  seconds, millis=rtctime.get()
  module.status.timestamp=tonumber(tostring(seconds) .. tostring(math.floor(millis/1000)))
  m:publish(settings.topics.pub.status, cjson.encode(module.status),0,0)
  print(cjson.encode(module.status))
end

local function toggle_state()
  if module.status.pins[0].status == gpio.HIGH then
    module.status.pins[0].status = gpio.LOW
  else
    module.status.pins[0].status = gpio.HIGH
  end
  gpio.write(module.status.pins[0].number, module.status.pins[0].status)
  send_status()
end

local function init_settings()
  -- initial output pin state
  module.status={}
  module.status.deviceID=config.ID
  module.status.pins={}

  module.status.pins[0]={
    number=1,
    type="digitalOutput",
    purpose="Toggle lights",
    status=gpio.LOW
  }
  -- module.status.pins[1]={
  --   number=2,
  --   type="digitalInput",
  --   purpose="Physical toggle button",
  --   status=nil
  -- }

  print(tostring(cjson.encode(module.status)))

  gpio.mode(module.status.pins[0].number, gpio.OUTPUT)
  gpio.write(module.status.pins[0].number, module.status.pins[0].status)

  -- gpio.mode(module.status.pins[1].number, gpio.INT, gpio.PULLUP)
  -- gpio.trig(module.status.pins[1].number, "down", toggle_state)

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
