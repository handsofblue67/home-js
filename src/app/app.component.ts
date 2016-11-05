import { Component } from '@angular/core'

import * as _ from 'lodash'
import * as moment from 'moment'
import { Subject } from 'rxjs/Subject'
import './shared'

import { ChartService } from './chart.service'
import { ToggleService } from './toggle.service'
import { Device, DeviceStatus, DeviceType, Mqtt } from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  devices: Array<Device>
  groupedDevices: any

  constructor(
    private chartService: ChartService,
    private toggleService: ToggleService
  ) { }

  toggle(device: Device): void {
    this.toggleService.toggleDevice(device)
  }
}