import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import './shared'
import { Mqtt, Device, DeviceStatus, DeviceType, Topics } from './models'

@Injectable()
export class BackendService {
  headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http) { }

  getDevicesByType(type: string): Observable<Array<Device>> {
    return this.http.get(`api/devices/${type}`)
      .map(res => res.json())
      .catch(this.handleError)
  }

  getDeviceData(device: Device): Observable<Array<DeviceStatus>> {
    return this.http.get(`api/statuses/${device.deviceID}`)
      .map(res => {
        let body = res.json()
        console.log(body.length)
        return body
      })
      .catch(this.handleError)
  }

  publish(mqtt: Mqtt): Observable<any> {
    return this.http.post('api/publish', JSON.stringify(mqtt), { headers: this.headers })
      .map(res => res)
      .catch(this.handleError)
  }

  // publishRGB(redDuty: number, greenDuty: number, blueDuty: number) {
  //   console.log(`${redDuty} ${greenDuty} ${blueDuty}`)
  //   const mqtt = <Mqtt>{ 'topic': '/status/13774646/rgb', 'message': `{ "_id": "581035d105e88300012de869", "PIN_STATE": 1, "BUTTON_PIN": 2, "ID": 13774646, "RGB": { "RED": { "DUTY": ${redDuty}, "CLOCK": 500, "PIN": 8 }, "BLUE": { "DUTY": ${blueDuty}, "CLOCK": 500, "PIN": 7 }, "GREEN": { "DUTY": ${greenDuty}, "CLOCK": 500, "PIN": 6 } }, "checkinFreq": 60000, "OUTPUT_PIN": 1 }` }
  //   this.http.post('publish', JSON.stringify(mqtt), { headers: this.headers })
  //     .subscribe(res => console.log('published'))
  // }

  private handleError(err: any) {
    let errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusTest}` : 'Server error'
    return Observable.throw(errMsg)
  }

  getGeofenceDevices() {
    return this.http.get('api/geofence')
      .map(res => res.json())
      .catch(this.handleError)
  }

  getGeofenceByDevice(id: string) {
    return this.http.get(`api/geofence/${id}`)
      .map(res => res.json())
      .catch(this.handleError)
  }

}
