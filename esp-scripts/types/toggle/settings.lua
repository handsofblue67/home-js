local module={}

module.deviceID=config.ID
module.name="Bedroom Light"
module.checkinFreq=0
module.deviceType="Toggle"

module.components={}
module.components[1]={ name="Light", type="toggle", pinNumber=1, units="boolean", isTimeSeries=false, controlState=gpio.LOW}

module.topics={}

module.topics.sub={}
module.topics.sub.settings="/settings/" .. config.ID
module.topics.sub.reqStatus="/reqStatus/" .. config.ID
module.topics.sub.updateState="/updateState/" .. config.ID

module.topics.pub={}
module.topics.pub.status="/status/" .. config.ID
module.topics.pub.will="/will/" .. config.ID
module.topics.pub.currentSettings="/currentSettings/" .. config.ID

return module
