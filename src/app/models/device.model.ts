export class DeviceData {
    deviceID: number
    type?: string | Array<string>
    name?: string
    outputPin?: number | Array<number>
    inputPin?: number | Array<number>
    pinState?: number
    topics?: {
        subscribe: any,
        publish: any
    }
    subscriptions?: Array<string>
    toggleInput?: number
    lightSensor?: number
    checkinFreq?: number
    toggleOutput?: number
    timestamp?: number | Date
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