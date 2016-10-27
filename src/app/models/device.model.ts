export class DeviceData {
    deviceID: number
    pinState?: number
    subscriptions?: Array<string>
    toggleInput?: number
    lightSensor?: number
    checkinFreq?: number
    toggleOutput?: number
    timestamp?: number
    rgb?: {
        green?: {
            clock?: number
            pin?: number
            duty?: number
        },
        blue?: {
            clock?: number
            pin?: number
            duty?: number
        }, red?: {
            clock?: number
            pin?: number
            duty?: number
        }
    }
} 

export class Device {
    deviceID: number
    deviceData: Array<DeviceData>
}