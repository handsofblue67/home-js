-- module.STATUS = "/status/" .. module.ID
-- module.rgb = "/set/" .. module.ID
-- module.TOGGLE = "/toggle/" .. module.ID
-- module.SETTINGS = "/settings/" .. module.ID-- file : application.lua

local module = {}
m = nil

local settings = {}

local function send_state()
  print(cjson.encode(settings))
  settings.lightSensor = adc.read(0)
  -- TODO: decouple settings and status/state
  m:publish(config.STATUS, cjson.encode(settings),0,0)
end

local function toggle_state()
  if settings.pinState == gpio.HIGH then
    settings.pinState = gpio.LOW
  else
    settings.pinState = gpio.HIGH
  end
  gpio.write(settings.toggleOutput, settings.pinState)
  send_state()
end

local function setup_rgb()
  settings.rgb={
    red={ pin=8, CLOCK=500, DUTY=512 },
    green={ pin=6, CLOCK=500, DUTY=512 },
    blue={ pin=7, CLOCK=500, DUTY=512 }
  }

  pwm.setup(settings.rgb.red.pin, settings.rgb.red.CLOCK, settings.rgb.red.DUTY)
  pwm.setup(settings.rgb.green.pin, settings.rgb.green.CLOCK, settings.rgb.green.DUTY)
  pwm.setup(settings.rgb.blue.pin, settings.rgb.blue.CLOCK, settings.rgb.blue.DUTY)

  pwm.start(settings.rgb.red.pin)
  pwm.start(settings.rgb.green.pin)
  pwm.start(settings.rgb.blue.pin)
end

local function init_settings()
  settings.ID=config.ID
  -- initial output pin state
  settings.pinState=gpio.LOW

  -- initialize pin 1 (gpio15) for output
  settings.toggleOutput=1
  gpio.mode(settings.toggleOutput, gpio.OUTPUT)
  gpio.write(settings.toggleOutput, settings.pinState)

  -- initialize pin 2(gpio04) for input
  settings.toggleInput=2
  gpio.mode(settings.toggleInput, gpio.INPUT)
  gpio.trig(settings.toggleInput, "down", toggle_state)

  setup_rgb()

  -- report every minute by default (just sends state of the controller)
  settings.checkinFreq = 60000

  settings.subscriptions = {
    config.RGB,
    config.TOGGLE,
    config.SETTINGS
  }
end

-- TODO: make settings more ..settable
local function adjust_settings(data)
  if data.checkinFreq ~= nil then
    settings.checkinFreq = data.checkinFreq
  end
end

local function adjust_rgb(data)
  settings.rgb=data.rgb
  pwm.setduty(settings.rgb.red.pin, settings.rgb.red.DUTY)
  pwm.setduty(settings.rgb.green.pin, settings.rgb.green.DUTY)
  pwm.setduty(settings.rgb.blue.pin, settings.rgb.blue.DUTY)
  pwm.setclock(settings.rgb.red.pin, settings.rgb.red.CLOCK)
  pwm.setclock(settings.rgb.green.pin, settings.rgb.green.CLOCK)
  pwm.setclock(settings.rgb.blue.pin, settings.rgb.blue.CLOCK)
end

-- Sends my id to the broker for registration
local function register_myself()
  m:subscribe({[config.TOGGLE]=0, [config.RGB]=0, [config.SETTINGS]=0},function(conn)
    print("Successfully subscribed to data endpoints: " .. config.RGB .. " " .. config.TOGGLE .. " " .. config.SETTINGS)
  end)
end

local function mqtt_start()
  m = mqtt.Client(config.ID, 120)
  -- register message callback beforehand
  m:on("message", function(conn, topic, data)
    if data ~= nil then
      print(topic .. ": " .. data)
      if topic == config.TOGGLE then
        toggle_state()
      elseif topic == config.RGB then
         adjust_rgb(cjson.decode(data))
      elseif topic == config.SETTINGS then
        adjust_settings(cjson.decode(data))
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
