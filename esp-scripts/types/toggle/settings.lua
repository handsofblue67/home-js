local module={}

module.settings={
  deviceID=config.ID
  host="192.168.1.6"
  port=1883
  name="Livingroom Light"
  checkinFreq=0,
  deviceType="light"
  components={
    light1={ 
      type="toggle"
      controlState=gpio.LOW
      pinNumber=1
    }
  }
  topics={
    sub={
      settings="/settings/" .. config.ID
      reqStatus="/reqStatus/" .. config.ID
    }
    pub={
      status="/status/" .. config.ID
      currentSettings="/currentSettings/" .. config.ID
      will="/will/" .. config.ID
    }
  }
}

return module
