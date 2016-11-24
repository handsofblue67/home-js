import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import './shared'

import { Mqtt, Device, DeviceStatus } from './models'
import { AuthService } from './auth.service'

@Injectable()
export class BackendService {
  headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http, private authService: AuthService) { }

  getDevicesByType(type: string): Observable<Array<Device>> {
    if (!this.headers['x-access-token']) {
      this.headers.append('x-access-token', this.authService.token)
    }
    const options = new RequestOptions({ headers: this.headers })
    return this.http.get(`api/devices/${type}`, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  getDeviceData(device: Device): Observable<Array<DeviceStatus>> {
    if (!this.headers['x-access-token']) {
      this.headers.append('x-access-token', this.authService.token)
    }
    const options = new RequestOptions({ headers: this.headers })
    return this.http.get(`api/statuses/${device.deviceID}`, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  publish(mqtt: Mqtt): Observable<any> {
    if (!this.headers['x-access-token']) {
      this.headers.append('x-access-token', this.authService.token)
    }
    const options = new RequestOptions({ headers: this.headers })
    return this.http.post('api/publish', JSON.stringify(mqtt), options)
      .map(res => res)
      .catch(this.handleError)
  }

  private handleError(err: any) {
    let errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusTest}` : 'Server error'
    return Observable.throw(errMsg)
  }

  getGeofenceDevices() {
    if (!this.headers['x-access-token']) {
      this.headers.append('x-access-token', this.authService.token)
    }
    const options = new RequestOptions({ headers: this.headers })
    return this.http.get('api/geofence', options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  getGeofenceByDevice(id: string) {
    if (!this.headers['x-access-token']) {
      this.headers.append('x-access-token', this.authService.token)
    }
    const options = new RequestOptions({ headers: this.headers })
    return this.http.get(`api/geofence/${id}`, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

}
