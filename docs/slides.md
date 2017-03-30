<!-- slide -->
# Internet-of-Things
### IoT
### Home Automation
<!-- slide -->
## Problem
![Physical_Layout](/docs/assets/Problem.png)

<!-- slide -->
## Existing Alternates
- Hub
  - <strong>Homekit</strong>
  - <a style="color: grey">Philips Hue</a>
  - <a style="color: grey">Z-Wave</a>
  - <a style="color: grey">Temporary Access Point</a>

<!-- slide -->
## Existing Alternates
- Hub
  - <a style="color: grey">Homekit</a>
  - <strong>Philips Hue</strong>
  - <a style="color: grey">Z-Wave</a>
  - <a style="color: grey">Temporary Access Point</a>

<!-- slide -->
## Existing Alternates
- Hub
  - <a style="color: grey">Homekit</a>
  - <a style="color: grey">Philips Hue</a>
  - <strong>Z-Wave</strong>
  - <a style="color: grey">Temporary Access Point</a>

<!-- slide -->
## Existing Alternates
- Hub
  - <a style="color: grey">Homekit</a>
  - <a style="color: grey">Philips Hue</a>
  - <a style="color: grey">Z-Wave</a>
  - <strong>Temporary Access Point</strong>

<!-- slide -->
## Goals
- <strong>Cheaper</strong>
- <a style="color: grey">Extensible</a>
- <a style="color: grey">Secure</a>
- <a style="color: grey">Easier</a>
- <a style="color: grey">Total control</a>
- <a style="color: grey">Limitless</a>

<!-- slide -->
## Goals
- <a style="color: grey">Cheaper</a>
- <strong>Extensible</strong>
- <a style="color: grey">Secure</a>
- <a style="color: grey">Easier</a>
- <a style="color: grey">Total control</a>
- <a style="color: grey">Limitless</a>

<!-- slide -->
## Goals
- <a style="color: grey">Cheaper</a>
- <a style="color: grey">Extensible</a>
- <strong>Secure</strong>
- <a style="color: grey">Easier</a>
- <a style="color: grey">Total control</a>
- <a style="color: grey">Limitless</a>

<!-- slide -->
## Goals
- <a style="color: grey">Cheaper</a>
- <a style="color: grey">Extensible</a>
- <a style="color: grey">Secure</a>
- <strong>Easier</strong>
- <a style="color: grey">Total control</a>
- <a style="color: grey">Limitless</a>

<!-- slide -->
## Goals
- <a style="color: grey">Cheaper</a>
- <a style="color: grey">Extensible</a>
- <a style="color: grey">Secure</a>
- <a style="color: grey">Easier</a>
- <strong>Total control</strong>
- <a style="color: grey">Limitless</a>

<!-- slide -->
## Goals
- <a style="color: grey">Cheaper</a>
- <a style="color: grey">Extensible</a>
- <a style="color: grey">Secure</a>
- <a style="color: grey">Easier</a>
- <a style="color: grey">Total control</a>
- <strong>Limitless</strong>

<!-- slide -->
## Physical Layout
![Physical_Layout](/docs/assets/Physical_Layout.png)

<!-- slide -->
## Physical Specifics
<!--  DHT11 is a temperature/humidity sensor-->
![Physical Specifics](/docs/assets/Physical_Specifics.png)

<!-- slide -->
## Logical View
<!--  explain that the server is running three different servers that could be hosted on different machines-->
![Logical View](/docs/assets/logical_view.png)

<!-- slide -->
# Modifying the state of a device
![Screen Shot 2017-03-27 at 3.43.26 PM](</assets/Screen Shot 2017-03-27 at 3.43.26 PM_x1vxm2hes.png>)

<!-- slide -->
- button sends request to change state
- server authorizes the action
- server forwards request over MQTT
- broker passes message to the subscribed devices
- device attempts to handle the new state
- stores the new state in flash memory
- pushes the new state to the broker
- server, which is a client of the broker gets the new state
- compares the state to the state stored in the database
- if different the server updates the record and appends the old state to the historical database if required
- server pushes new state the the user
- user renders the new state

<!-- slide -->
```@mermaid
graph LR
user-->server
```

<!-- slide -->
![Screen Shot 2017-03-27 at 3.43.57 PM](</assets/Screen Shot 2017-03-27 at 3.43.57 PM_b4byx9vof.png>)

<!-- slide -->
## Lessons Learned

<!-- slide -->
## Future Plans/Possibilities
