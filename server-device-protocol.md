# Device to Server Protocol

###### Handshake
```{mermaid}
graph LR
dev[ESP8266]--Handshake - Publish /settings/deviceID -->broker[MQTT_Broker]
broker-->api[Server]
api-->Mongo/devices
```

```{mermaid}
sequenceDiagram
  ESP8266->>+Server: Initialize Handshake
    alt is valid
    Server-->>+ESP8266: Request State
      ESP8266-->>-Server: Send State
    else is invalid
      loop lt 3 tries
        Server-->>+ESP8266: Invalid
        ESP8266-->>-Server: Resend State
      end
    end
```

## Handshake

1. Upon connection, a device publishes a description of itself, including checkin behaviors, publish/subscribe topics, alterable settings etc.
2. The server, which subscribes to all topics, validates the devices announcement, and sets up the environment for it (adds/upserts a record of the device in table/collection of devices)
3. Server requests device state (publish to /reqStatus/deviceID)

## Device Announcement/Declaration

**A devices first communication with the server includes (in JSON):**
1. a schema for future status updates
2. type of data reported (scalar/boolean, time-series/control-state)
3. checkin behavior (never, on-change, periodically etc)
4. deviceID
5. list of all topics published/subscribed to

###### Example
```
{
  "deviceID": 12736004,
  "name": "Livingroom DHT",
  "primaryType": "digitalInput",
  "checkinFreq": 3600000,
  "type": "dht11",
  "topics": {
    "sub": {
      "settings": "/settings/12736004",
      "reqStatus": "/reqStatus/12736004"
    },
    "pub": {
      "status": "/status/12736004",
      "currentSettings": "/currentSettings/12736004"
    }
  },
  "schema": {
    "deviceID": 12736004,
    "timestamp": 1480192198673,
    "timeSeries": true,
    "type": "dht11",
    "purpose": "Temperature/Humidity Sensor",
    "state": {
      "status": "scalar",
      "temp": "scalar",
      "humi": "scalar"
    }
  }
}
```

## Status updates

- Upon receiving a status from a known device
  - Compares state to current operatonal state in database if changed store old data (including length of time in that state) to a time-series collection or database (if time-series data)
```{mermaid}
graph LR
dev[ESP8266]--Status update Publish /status/deviceID -->broker[MQTT_Broker]
broker-->api[Server]
api-->upsert{Did change?}
upsert--true-->Mongo/opStates
upsert--false-->null
```
