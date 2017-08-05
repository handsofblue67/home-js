export class Device {
    _id: string
    deviceID: string
    name: string
    deviceType: string
    checkinFreq?: number
    components: DeviceComponent[]
    topics: Topics
    createdAt: Date
    updatedAt: Date
}

export class DeviceComponent {
    type: string
    controlState: number
    name: string
    _id: string
    isTimeSeries?: boolean
    changedAt: string
}

export class Topics {
    sub: SubTopics
    pub: PubTopics
}

export class SubTopics {
    settings: string
    reqStatus: string
}

export class PubTopics {
    currentSettings: string
    status: string
}
