-- TODO: decouple settings and status/state

local module = {}
m = nil

local function send_state()
  print(cjson.encode(settings))
  local status = {
    deviceID = config.ID,
    lightSensor = adc.read(0),
    timestamp = rtctime.get()
  }
  m:publish(config.STATUS, cjson.encode(state),0,0)
end

-- TODO: make settings more ..settable
local function adjust_settings(data)
  if data.checkinFreq ~= nil then
    settings.checkinFreq = data.checkinFreq
  end
end

-- subscriptions
local function register_myself()
  m:subscribe({[config.SETTINGS]=0},function(conn)
    print("Successfully subscribed to data endpoints: " .. config.SETTINGS)
  end)
end

local function mqtt_start()
  -- define client
  m = mqtt.Client(config.ID, 120)

  -- register message callback beforehand
  m:on("message", function(conn, topic, data)
    if data ~= nil then
      adjust_settings(cjson.decode(data))
    end
  end)

  -- connect
  m:connect(config.HOST, config.PORT, 0, 1, function(con)
    init_settings()
    register_myself()
    tmr.stop(6)
    tmr.alarm(6, settings.checkinFreq, 1, send_state)
  end)

end

function module.start()
  mqtt_start()
end

return module