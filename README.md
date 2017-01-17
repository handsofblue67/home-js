# HomeJs

A framework for all things home automation and Internet-of-Things. Built using NodeJS, Angular 2, Mosquitto and MongoDB

## Development server
`ng serve` to run development, if hosting a server locally,otherwise `npm start` points to production server

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Environment Decisions
> There are many ways to go about solving the problem of home automation, here I will discuss some of the alternatives and the reasons using the chosen technologies

### Microcontrollers
- Hardware
  - _Espressif ESP8266 esp-12x_
        - [Cheap as dirt ](https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20161201155231&isPremium=y&SearchText=esp8266+esp1-12)
    - [Well support](http://www.esp8266.com/)
    - built-in-wifi (FCC certified)
- Firmware
  - _NodeMCU_
    - Pros
      - Lua based firmware
      - Well supported
      - High-level (javascript-ish)
      - Reasonably fast
    - Cons
      - Takes up more memory (combat this by building custom firmware with only needed modules)
  - Arduino (not used)
    - Pros
      - familiar to anyone who knows arduino
      - Over-the-air updates
      - VERY well supported
      - Fast
    - Cons
      - Low-level (bad for networking)
### Device-server Communication
- Network Protocol
  - _MQTT_ ([Message Queue Transport Telemetry](mqtt.org)) (Mosquitto as broker)
    - Light-weight
    - Built with intermittent connectivity in mind (Will, QoS, etc)
    - Publish/Subscribe
  - HTTP (not used)
    - Well known, robust
    - More overhead
    - Does not fit this projects requirments as well as MQTT

### Server
  - NodeJS/Express
    - Non-blocking IO, (which there is a great deal of with so much connectivity)
    - Familiar to developer
    - Shared language on front-end and back-end
    -
### Database
  - MongoDB
