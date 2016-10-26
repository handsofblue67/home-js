-- file : application.lua
local module = {}
m = nil

local settings = {}

local function send_state()
  print(cjson.encode(settings))
  m:publish(config.ENDPOINT .. config.ID .. "/state", cjson.encode(settings),0,0)
end

local function toggle_state()
  if settings.PIN_STATE == gpio.HIGH then
    settings.PIN_STATE = gpio.LOW
  else
    settings.PIN_STATE = gpio.HIGH
  end
  gpio.write(settings.OUTPUT_PIN, settings.PIN_STATE)
  send_state()
end

local function setup_rgb()
  settings.RGB={
    RED={ PIN=8, CLOCK=500, DUTY=512 },
    GREEN={ PIN=6, CLOCK=500, DUTY=512 },
    BLUE={ PIN=7, CLOCK=500, DUTY=512 }
  }

  pwm.setup(settings.RGB.RED.PIN, settings.RGB.RED.CLOCK, settings.RGB.RED.DUTY)
  pwm.setup(settings.RGB.GREEN.PIN, settings.RGB.GREEN.CLOCK, settings.RGB.GREEN.DUTY)
  pwm.setup(settings.RGB.BLUE.PIN, settings.RGB.BLUE.CLOCK, settings.RGB.BLUE.DUTY)

  pwm.start(settings.RGB.RED.PIN)
  pwm.start(settings.RGB.GREEN.PIN)
  pwm.start(settings.RGB.BLUE.PIN)
end

local function init_settings()
  settings.ID=config.ID
  -- initial output pin state
  settings.PIN_STATE=gpio.LOW

  -- initialize pin 1 (gpio15) for output
  settings.OUTPUT_PIN=1
  gpio.mode(settings.OUTPUT_PIN, gpio.OUTPUT)
  gpio.write(settings.OUTPUT_PIN, settings.PIN_STATE)

  -- initialize pin 2(gpio04) for input
  settings.BUTTON_PIN=2
  gpio.mode(settings.BUTTON_PIN, gpio.INPUT)
  gpio.trig(settings.BUTTON_PIN, "down", toggle_state)

  setup_rgb()

  -- report every minute by default (just sends state of the controller)
  settings.checkinFreq = 60000
end

local function adjust_rgb(data)
  settings.RGB=data.RGB
  pwm.setduty(settings.RGB.RED.PIN, settings.RGB.RED.DUTY)
  pwm.setduty(settings.RGB.GREEN.PIN, settings.RGB.GREEN.DUTY)
  pwm.setduty(settings.RGB.BLUE.PIN, settings.RGB.BLUE.DUTY)
  pwm.setclock(settings.RGB.RED.PIN, settings.RGB.RED.CLOCK)
  pwm.setclock(settings.RGB.GREEN.PIN, settings.RGB.GREEN.CLOCK)
  pwm.setclock(settings.RGB.BLUE.PIN, settings.RGB.BLUE.CLOCK)
end

-- Sends my id to the broker for registration
local function register_myself()
  m:subscribe({[config.ENDPOINT .. config.ID  .. "/toggle"]=0, [config.ENDPOINT .. config.ID .. "/rgb"]=0},function(conn)
    print("Successfully subscribed to data endpoint: " .. config.ENDPOINT .. config.ID .. "/toggle")
  end)
end

local function mqtt_start()
  m = mqtt.Client(config.ID, 120)
  -- register message callback beforehand
  m:on("message", function(conn, topic, data)

    if data ~= nil then
      print(topic .. ": " .. data)
      if topic == config.ENDPOINT .. config.ID .. "/toggle" then
        toggle_state()
      elseif topic == config.ENDPOINT .. config.ID .. "/rgb" then
         adjust_rgb(cjson.decode(data))
      end
    end
  end)

  -- Connect to broker
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
