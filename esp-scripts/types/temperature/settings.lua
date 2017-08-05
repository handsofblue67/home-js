local module={}

module.deviceID=config.ID
module.name="Bedroom Temp/Humidity"
module.checkinFreq=60000
module.deviceType="DHT11"

module.components={}
module.components[1]={ name="temperature", type="sensor", pinNumber=0, units="celsius", isTimeSeries=true }
module.components[2]={ name="humidity", type="sensor", pinNumber=0, units="percent", isTimeSeries=true }

module.topics={}

module.topics.sub={}
module.topics.sub.settings="/settings/" .. config.ID
module.topics.sub.reqStatus="/reqStatus/" .. config.ID

module.topics.pub={}
module.topics.pub.status="/status/" .. config.ID
module.topics.pub.will="/will/" .. config.ID
module.topics.pub.currentSettings="/currentSettings/" .. config.ID

return module
