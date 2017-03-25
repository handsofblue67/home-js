# IoT Platform

##### Abstract
The goal of this project is to design and implement an Internet-of-Things platform with an emphasis on being lightweight, inexpensive and extensible. The platform will aim to take advantage of external APIs and constraint driven logic to control devices in a desireable way, with as little effort from the user as possible. The system must be easy to deploy and light weight enough to run on a wide range of servers, including popular SoCs.

##### Description
Each device will communicate with an MQTT broker which the Node server is also a client. The server subscribes to all topics on the broker. This server is responsible for registering new devices, verifying devices stay within the systems device-to-server protocal, aggregating time series data and handling all authentication and authorization with respect to the web client.
Express framework will be used, along with Feathersjs to help keep this server organized, minimize development time, while not sacrificing performance.

As mentioned before, a protocol will be defined, which will describe the schema which devices will follow in all communication with the server. This must be done to create strict guidelines when creating a new device type, but must also be flexible enough to encourage extensibility with respect to devices.

##### A list of the applicable tools, operating systems, hardware platforms, standards, etc.
    - Angular 2
    - Docker
    - ESP8266
    - ExpressJS
    - FeathersJS
    - Google Maps API
    - MongoDB
    - Mosquitto
    - MQTT
    - NodeJS
    - Websockets (Socket.io)

##### Description of any relevant licensing and intellectual property issues

##### A list of the proposed deliverables, such as source code; executables; progress reports; final project report; oral presentation; daily journal/work log detailing what work was done, how much time was spent that day, and any technical details that might be needed for later reference; and any other relevant items

##### A detailed project schedule with dates for the completion of each significant project element/milestone

##### The name of the project adviser and the semester that the project will be completed
    - **Project Advisor:** Professor David Wagstaff
    - Spring Semester 2017
- Anything else relevant to the project

_Your proposal must be completed and approved by your project adviser before you will be permitted to register for the course._