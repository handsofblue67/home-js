import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Injectable()
export class BackendService {
  private deviceSource = new BehaviorSubject<Array<{}>>([])
  devices$ = this.deviceSource.asObservable()

  constructor(private http: Http) {
    this.getDevices().subscribe(o => this.deviceSource.next(o))
  }

  getDevices(): Observable<Array<{}>> {
    return this.http.get('devices')
      .map(res => res.json())
  }
}
