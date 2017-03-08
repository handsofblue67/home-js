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
  - <strong>Homekit</string>
  - <a style="color: grey">Philips Hue</a>
  - <a style="color: grey">Z-Wave</a>
  - <a style="color: grey">Temporary Access Point</a>

<!-- slide -->
## Existing Alternates
- Hub
  - <a style="color: grey">Homekit</a>
  - <strong>Philips Hue</string>
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
  - <strong>Temporary Access Point</string>

<!-- slide -->
## Goals
- <strong>Cheaper</string>
- <a style="color: grey">Extensible</a>
- <a style="color: grey">Secure</a>
- <a style="color: grey">Easier</a>
- <a style="color: grey">Total control</a>
- <a style="color: grey">Limitless</a>

<!-- slide -->
## Goals
- <a style="color: grey">Cheaper</a>
- <strong>Extensible</string>
- <a style="color: grey">Secure</a>
- <a style="color: grey">Easier</a>
- <a style="color: grey">Total control</a>
- <a style="color: grey">Limitless</a>

<!-- slide -->
## Goals
- <a style="color: grey">Cheaper</a>
- <a style="color: grey">Extensible</a>
- <strong>Secure</string>
- <a style="color: grey">Easier</a>
- <a style="color: grey">Total control</a>
- <a style="color: grey">Limitless</a>

<!-- slide -->
## Goals
- <a style="color: grey">Cheaper</a>
- <a style="color: grey">Extensible</a>
- <a style="color: grey">Secure</a>
- <strong>Easier</string>
- <a style="color: grey">Total control</a>
- <a style="color: grey">Limitless</a>

<!-- slide -->
## Goals
- <a style="color: grey">Cheaper</a>
- <a style="color: grey">Extensible</a>
- <a style="color: grey">Secure</a>
- <a style="color: grey">Easier</a>
- <strong>Total control</string>
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
![Physical Specifics](/docs/assets/Physical_Specifics.png)

<!-- slide -->
## Logical View

![Logical View](/docs/assets/logical_view.png)
<!-- slide -->
## Subsystems

![Subsystems](/docs/assets/subsystems.png)
<!-- slide -->

## Sequence Diagrams

```@mermaid
sequenceDiagram
  ESP8266-xServer:/settings/deviceID(state)
  activate Server
  activate Server
  alt valid
    Server-xDevice Collection: upsert(deviceID)
    Server-x+ESP8266:/reqStatus/deviceID
    deactivate Server
    activate ESP8266
    Note over ESP8266, Server: Update State
    deactivate ESP8266
  else invalid
    loop tries < max
      Server-x+ESP8266:/reqSettings/deviceID
      deactivate Server
      activate ESP8266
      ESP8266-xServer:/settings/deviceID(state)
      deactivate ESP8266
    end
  end
```
<!-- slide -->
## Status Update

```@mermaid
sequenceDiagram
  ESP8266-x+Server: /status/deviceID
  Server->>Operational State: [State Change] upsert new state
  Server-xTime Series: [State Change] oldState+=timeInState
  Server-x-Client: [State Change] onChange
```

<!-- slide -->
##  Client Push

```@mermaid
  sequenceDiagram
  Client-x+Server: websocket(deviceID, new state || toggle)
  activate ESP8266
  Server-xESP8266: /updateStatus/deviceID(newState|toggle)
  Note over ESP8266, Client: Status Update
  deactivate ESP8266
```
