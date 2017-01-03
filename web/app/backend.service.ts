import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import './shared'

import { Mqtt, Device, DeviceStatus } from './models'
import { AuthService } from './auth.service'

@Injectable()
export class BackendService {

  constructor(private http: Http, private authService: AuthService) { }

  getDevicesByType(type: string): Observable<Array<Device>> {
    const options = new RequestOptions(this.generateHeaders())
    return this.http.get(`devices/${type}`, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  getDeviceData(device: Device): Observable<Array<DeviceStatus>> {
    const options = new RequestOptions(this.generateHeaders())
    return this.http.get(`statuses/${device.deviceID}`, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  publish(mqtt: Mqtt): Observable<any> {
    const options = new RequestOptions(this.generateHeaders())
    return this.http.post('publish', JSON.stringify(mqtt), options)
      .map(res => res)
      .catch(this.handleError)
  }

  private handleError(err: any) {
    let errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusTest}` : 'Server error'
    return Observable.throw(errMsg)
  }

  getGeofenceDevices() {
    const options = new RequestOptions(this.generateHeaders())
    return this.http.get('geofence', options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  getGeofenceByDevice(id: string) {
    const options = new RequestOptions(this.generateHeaders())
    return this.http.get(`geofence/${id}`, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  generateHeaders() {
    return { headers: new Headers({ 'Authorization': this.authService.token }) }
  }
}
