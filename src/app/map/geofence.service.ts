import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import '../shared'
import * as _ from 'lodash'

import { BackendService } from '../backend.service'

@Injectable()
export class GeofenceService {
  devices: Array<any> = []
  private mapSource = new BehaviorSubject<any[]>(this.devices)
  map$ = this.mapSource.asObservable()

  constructor(private backend: BackendService) {
    backend.getGeofenceDevices().subscribe(devices => {
      _.each(devices, device => backend.getGeofenceByDevice(device)
        .subscribe(entries => {
          this.devices = [...this.devices, ...entries]
          this.mapSource.next(this.devices)
        }))
    })
  }

}
