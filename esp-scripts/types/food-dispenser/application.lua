-- file : application.lua

-- push
-- "duty": 500
-- "clock": 300

-- pull
-- "duty" : 500
-- "clock" : 356,

-- stop
-- "duty": 0
-- "clock": 1

local module = {}
m = nil

local function syncTime() 
  sntp.sync("pool.ntp.org", function()
    seconds, millis=rtctime.get()
    print(tonumber(tostring(seconds) .. tostring(math.floor(millis/1000))))
  end, print)
end

local function send_status()
  seconds, millis=rtctime.get()
  module.status.timestamp=tonumber(tostring(seconds) .. tostring(math.floor(millis/1000)))
  m:publish(settings.topics.pub.status, cjson.encode(module.status),0,0)
  print(cjson.encode(module.status))
end

local function update_state(newState)
  module.status.pins[0].status=newState
  pwm.setclock(module.status.pins[0].number, module.status.pins[0].status.clock);
  pwm.setduty(module.status.pins[0].number, module.status.pins[0].status.duty);
  send_status()
end

local function init_settings()
  -- initial output pin state
  module.status={}
  module.status.deviceID=config.ID
  module.status.name=settings.name
  module.status.pins={}
  
  module.status.pins[0]={
    number=1,
    type="digitalOutput",
    purpose="pwm servo controller (forward/reverse)",
    status={ duty=0, clock=1 }
  }
  pwm.setup(module.status.pins[0].number,
            module.status.pins[0].status.duty,
            module.status.pins[0].status.clock)
end

local function send_settings()
  m:publish(settings.topics.pub.currentSettings, cjson.encode(settings),0,0)
end

local function alter_settings(topic)
  send_settings()
end

-- Sends my id to the broker for registration
local function register_myself(topics)
  -- sub = settings.topics.subscribe
  m:subscribe({[topics.update]=0, [topics.settings]=0, [topics.reqStatus]=0},function(conn)
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
      if topic == topics.update then
        print(topic)
        update_state(cjson.decode(data))
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
    tmr.stop(6)
    tmr.alarm(6, 6870947, tmr.ALARM_SEMI, syncTime)
    tmr.stop(5)
    tmr.alarm(5, 3600000, tmr.ALARM_SEMI, function()
      currentTime=rtctime.epaoch2cal(rtctime.get())
      print(currentTime["hour"])
      if (currentTime["hour"] == 8) then
        module.status.pins[0].status={ duty=500, clock=300 }
        tmr.stop(4)
        tmr.alarm(4, 30000, tmr.ALARM_SINGLE, function()
          module.status.pins[0].status={ duty=0, clock=1 }
        end)
      end
    end)
  end)
end

function module.start()
  mqtt_start(settings.topics.sub)
end

return module
