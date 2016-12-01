-- TODO: decouple settings and status/state

local module = {}
m = nil

local function syncTime() 
  sntp.sync("pool.ntp.org", function()
    seconds, millis=rtctime.get()
    print(tonumber(tostring(seconds) .. tostring(math.floor(millis/1000))))
  end, print)
end

local function send_state()
  status, temp, humi, tempDec, humiDec = dht.read11(module.status.pins[0].number)
  seconds, millis=rtctime.get()
  module.status.timestamp=tonumber(tostring(seconds) .. tostring(math.floor(millis/1000)))
  module.status.pins[0].status={status=status, temp=temp, humi=humi }
  m:publish(settings.topics.pub.status, cjson.encode(module.status),0,0)
  print(cjson.encode(module.status))
end

local function init_settings()
  module.status={}
  module.status.deviceID=config.ID
  module.status.pins={}

  module.status.pins[0]={
    number=1,
    type="digitalInput",
    purpose="Temperature/Humidity Sensor",
    status=nil
  }
end

local function send_settings()
  m:publish(settings.topics.pub.currentSettings, cjson.encode(settings),0,0)
end

local function alter_settings(data)
  send_settings()
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
        send_state()
      end
    end
  end)

  -- connect
  m:connect(config.HOST, config.PORT, 0, 1, function(con)
    init_settings()
    register_myself(settings.topics.sub)
    tmr.stop(6)
    tmr.alarm(6, settings.checkinFreq, 1, send_state)
    tmr.stop(5)
    tmr.alarm(5, 6870947, tmr.ALARM_SEMI, syncTime)
  end)

end

function module.start()
  mqtt_start(settings.topics.sub)
end

return module
