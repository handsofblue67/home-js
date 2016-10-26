# ESP8266 Scripts
These scripts are uploaded to an ESP8266. They are written in Lua, which is very well supported on the ESP platform, so it is recomended that you are familiar with Lua. The scripts are designed to follow specifications of communication defined by HomeJS

The ESP8266 can also be coded from the Arduino IDE, but HomeJS does not not currently support it.

## Types
Types are properties of a specific device. They refer to the job the controller has, from simple toggle switches, (a responder) to a watcher, that reports on change detection or periodically
The goal is to keep everything highly configurable after a device is deployed (change reporting constraints and pin reperposing) but avoid overhead of modules a device will never need

## Firmware
You need [esptools](https://github.com/themadinventor/esptool), which requires python2.7 (or another tool to flash firmware onto your esp8266)
If a pre-made firmware that meets your needs does not already exist in the firmware directory, create one: [Custom Firmware](https://nodemcu-build.com/index.php)
Install upload the firmware:
<!-- >`python ~/.local/lib/python2.7/site-packages/esptool.py --port /dev/ttyUSB0 write_flash -fm dio -fs 32m 0x00000 <path to firmware>.bin` -->
>`esptool.py --port /dev/<your ESP> write_flash -fm dio -fs 32m 0x00000 <path to firmware>.bin`

## Configuration
I have had decent success using [ESPlorer](http://esp8266.ru/esplorer/) to upload code to my esp, but there are several other tools out there

After finding the desired *Type* of sensors your device will be, modify the config.lua script to match the address of your MQTT broker, and configure your access point. Most of the code that you will edit is within application.lua
