export class Device {
    deviceID: number
    name?: string
    topics?: Topics
    timestamp?: Date | number
    primaryType?: DeviceType
    status: Array<DeviceStatus>
    checkinFreq: number
}

export class DeviceStatus {
    deviceID: number
    timestamp?: Date | number
    pins: Array<Pin>
}

export enum DeviceType { digitalOutput, digitalInput, analogOutput, analogInput }

export class Pin {
    number: number
    purpose?: string
    status: any
    type: DeviceType
}

export class Topics {
    sub: {
        toggle?: string
        settings?: string
        reqStatus?: string
        setPins?: string
    }
    pub: {
        status?: string
        currentSettings?: string
    }
}
