-- TODO: decouple settings and status/state

local module = {}
m = nil

local function sendState()
  seconds, millis=rtctime.get()
  module.status.timestamp=tonumber(tostring(seconds) .. tostring(math.floor(millis/1000)))
  module.status.pins[0].status=adc.read(module.status.pins[0].number)
  m:publish(settings.topics.pub.status, cjson.encode(module.status),0,0)
  print(cjson.encode(module.status))
end

local function startFan()
  tmr.stop(2)
  tmr.alarm(2, 300000, tmr.ALARM_SINGLE, stopFan)
  module.status.pins[1].status=GPIO.HIGH
  gpio.write(module.status.pins[1].number, module.status.pins[1].status)
end

local function stopFan()
  module.status.pins[1].status=GPIO.LOW
  gpio.write(module.status.pins[1].number, module.status.pins[1].status)
end

local function startTimer() 
  tmr.stop(2)
  tmr.alarm(2, 300000, tmr.ALARM_SINGLE, startFan)
end

local function initSettings()
  module.status={}
  module.status.deviceID=config.ID
  module.status.pins={}

  module.status.pins[0]={
    number=0,
    type="digitalInput",
    purpose="PIR sensor, detects motion in Lab",
    status=nil
  }
  module.status.pins[1]={
    number=1,
    type="digitalOutput"
    purpose="Operates Exhaust Fan",
    status=GPIO.LOW
  }

  gpio.mode(module.status.pins[0].number, gpio.INPUT)
  gpio.trig(module.status.pins[0].number, "down", startTimer)

  gpio.mode(module.status.pins[1].number, gpio.OUTPUT)
  gpio.write(module.status.pins[1].number, module.status.pins[1].status)
end

local function alterSettings(data)
  sendSettings()
end

local function sendSettings()
  m:publish(settings.topics.pub.currentSettings, cjson.encode(settings),0,0)
end

-- subscriptions
local function registerMyself(topics)
  m:subscribe({[topics.settings]=0, [topics.reqStatus]=0},function(conn)
    print("Successfully subscribed to data endpoints: " .. topics.settings .. ", " .. topics.reqStatus)
    sendSettings()
  end)
end

local function mqttStart(topics)
  -- define client
  m = mqtt.Client(config.ID, 120)
  -- register message callback beforehand
  m:on("message", function(conn, topic, data)
    if data ~= nil then
      if topic == topics.settings then
        alterSettings(cjson.decode(data))
      elseif topic == topics.reqStatus then
        sendStatus()
      end
    end
  end)

  -- connect
  m:connect(config.HOST, config.PORT, 0, 1, function(con)
    initSettings()
    registerMyself(settings.topics.sub)
    tmr.stop(6)
    tmr.alarm(6, settings.checkinFreq, 1, sendState)
  end)

end

function module.start()
  mqttStart(settings.topics.sub)
end

return module
