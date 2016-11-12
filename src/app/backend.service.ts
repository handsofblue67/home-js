import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import { AuthHttp } from 'angular2-jwt'
import { Observable } from 'rxjs/Observable'
import './shared'

import { Mqtt, Device, DeviceStatus } from './models'

@Injectable()
export class BackendService {
  headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getDevicesByType(type: string): Observable<Array<Device>> {
    return this.authHttp.get(`api/devices/${type}`)
      .map(res => res.json())
      .catch(this.handleError)
  }

  getDeviceData(device: Device): Observable<Array<DeviceStatus>> {
    return this.authHttp.get(`api/statuses/${device.deviceID}`)
      .map(res => res.json())
      .catch(this.handleError)
  }

  publish(mqtt: Mqtt): Observable<any> {
    return this.authHttp.post('api/publish', JSON.stringify(mqtt), { headers: this.headers })
      .map(res => res)
      .catch(this.handleError)
  }

  private handleError(err: any) {
    let errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusTest}` : 'Server error'
    return Observable.throw(errMsg)
  }

  getGeofenceDevices() {
    return this.authHttp.get('api/geofence')
      .map(res => res.json())
      .catch(this.handleError)
  }

  getGeofenceByDevice(id: string) {
    return this.authHttp.get(`api/geofence/${id}`)
      .map(res => res.json())
      .catch(this.handleError)
  }

  getChat() {
    return this.authHttp.get('api/chat')
      .map(res => res.json())
      .catch(this.handleError)
  }

}
