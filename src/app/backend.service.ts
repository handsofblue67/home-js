import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { Mqtt } from './models'

@Injectable()
export class BackendService {
  private deviceSource = new BehaviorSubject<Array<{}>>([])
  // private dataSource = new BehaviorSubject<Array<{}>>([])
  devices$ = this.deviceSource.asObservable()
  // data$ = this.dataSource.asObservable()
  headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http) {
    this.getDevices().subscribe(o => this.deviceSource.next(o))
  }

  getDevices(): Observable<Array<{}>> {
    return this.http.get('devices')
      .map(res => res.json())
  }

  getDataByID(id: number): Array<{}>  {
    let data = [] 
    this.getDeviceData(id).subscribe(res => data = res)
    return data
  }

  getDeviceData(id: number): Observable<Array<{}>> {
    return this.http.get(`mcuStates/${id}`)
      .map(res => res.json())
  }  

  publish(mqtt: Mqtt = <Mqtt>{'topic': '/status/13774646/toggle', 'message': new Date()}): void {
    this.http.post('publish', JSON.stringify(mqtt), {headers: this.headers})
      .subscribe(res => console.log('published'))
  }

  publishRGB(redDuty: number, greenDuty: number, blueDuty: number) {
    console.log(`${redDuty} ${greenDuty} ${blueDuty}`)
    const mqtt = <Mqtt>{'topic': '/status/13774646/rgb', 'message': `{ "_id": "581035d105e88300012de869", "PIN_STATE": 1, "BUTTON_PIN": 2, "ID": 13774646, "RGB": { "RED": { "DUTY": ${redDuty}, "CLOCK": 500, "PIN": 8 }, "BLUE": { "DUTY": ${blueDuty}, "CLOCK": 500, "PIN": 7 }, "GREEN": { "DUTY": ${greenDuty}, "CLOCK": 500, "PIN": 6 } }, "checkinFreq": 60000, "OUTPUT_PIN": 1 }`}
    this.http.post('publish', JSON.stringify(mqtt), {headers: this.headers})
      .subscribe(res => console.log('published'))
  }
}
