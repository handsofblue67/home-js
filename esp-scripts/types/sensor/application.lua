-- TODO: decouple settings and status/state

local module = {}
m = nil

local function send_state()
  seconds, millis=rtctime.get()
  module.status.timestamp=tonumber(tostring(seconds) .. tostring(math.floor(millis/1000)))
  module.status.pins[0].status=adc.read(module.status.pins[0].number)
  m:publish(settings.topics.pub.status, cjson.encode(module.status),0,0)
  print(cjson.encode(module.status))
end

local function init_settings()
  module.status={}
  module.status.deviceID=config.ID
  module.status.pins={}

  module.status.pins[0]={
    number=0,
    type="analogInput",
    purpose="Light sensor",
    status=nil
  }
  module.status.pins[1]={
    number=2,
    type="digitalInput",
    purpose="Physical send status button",
    status=nil
  }

  gpio.mode(module.status.pins[1].number, gpio.INPUT)
  gpio.trig(module.status.pins[1].number, "down", send_state)
end

local function alter_settings(data)
  send_settings()
end

local function send_settings()
  m:publish(settings.topics.pub.currentSettings, cjson.encode(settings),0,0)
end

-- subscriptions
local function register_myself(topics)
  m:subscribe({[topics.settings]=0, [topics.reqStatus]=0},function(conn)
    print("Successfully subscribed to data endpoints: " .. topics.settings .. ", " .. topics.reqStatus)
    send_settings()
  end)
end

local function mqtt_start(topics)
  -- define client
  m = mqtt.Client(config.ID, 120)
  -- register message callback beforehand
  m:on("message", function(conn, topic, data)
    if data ~= nil then
      if topic == topics.settings then
        alter_settings(cjson.decode(data))
      elseif topic == topics.reqStatus then
        send_status()
      end
    end
  end)

  -- connect
  m:connect(config.HOST, config.PORT, 0, 1, function(con)
    init_settings()
    register_myself(settings.topics.sub)
    tmr.stop(6)
    tmr.alarm(6, settings.checkinFreq, 1, send_state)
  end)

end

function module.start()
  mqtt_start(settings.topics.sub)
end

return module
