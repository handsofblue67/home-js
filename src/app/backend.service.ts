import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import './shared'
import { Mqtt, Device, DeviceData } from './models'

@Injectable()
export class BackendService {
  devices: Array<Device>
  private deviceSource = new BehaviorSubject<Array<Device>>([])
  devices$ = this.deviceSource.asObservable()
  headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http) {
    this.getDevices().subscribe(device => {
      this.devices = device
      this.deviceSource.next(this.devices)
    })
  }

  getDevices(): Observable<Array<Device>> {
    return this.http.get('devices')
      .map(res => _.map(res.json(), id => <Device>{deviceID: id, deviceData: []}))
      .catch(this.handleError)
  }

  getDeviceData(id: number): Observable<Array<DeviceData>> {
    return this.http.get(`mcuStates/${id}`)
      .map(res => {
        let deviceData = <Array<DeviceData>>res.json()
        _.find(this.devices, (device: DeviceData) => device.deviceID === deviceData[0].deviceID).deviceData = [...deviceData]
        return deviceData
      })
      .catch(this.handleError)
  }  

  publish(mqtt: Mqtt): Observable<any> {
    return this.http.post('publish', JSON.stringify(mqtt), {headers: this.headers})
      .map(res => res)
      .catch(this.handleError)
  }

  publishRGB(redDuty: number, greenDuty: number, blueDuty: number) {
    console.log(`${redDuty} ${greenDuty} ${blueDuty}`)
    const mqtt = <Mqtt>{'topic': '/status/13774646/rgb', 'message': `{ "_id": "581035d105e88300012de869", "PIN_STATE": 1, "BUTTON_PIN": 2, "ID": 13774646, "RGB": { "RED": { "DUTY": ${redDuty}, "CLOCK": 500, "PIN": 8 }, "BLUE": { "DUTY": ${blueDuty}, "CLOCK": 500, "PIN": 7 }, "GREEN": { "DUTY": ${greenDuty}, "CLOCK": 500, "PIN": 6 } }, "checkinFreq": 60000, "OUTPUT_PIN": 1 }`}
    this.http.post('publish', JSON.stringify(mqtt), {headers: this.headers})
      .subscribe(res => console.log('published'))
  }

  private handleError(err: any) {
    let errMsg = (err.message) ? err.message : 
      err.status? `${err.status} - ${err.statusTest}` : 'Server error'
      return Observable.throw(errMsg)
  }
}
