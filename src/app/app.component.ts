import { Component } from '@angular/core'

import * as _ from 'lodash'

import { BackendService } from './backend.service'
import { Device, DeviceData } from './models'
// import * as mqtt from 'mqtt'
import * as moment from 'moment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  charts: Array<any> = []
  devices: Array<Device>

  constructor(private backend: BackendService) {
    backend.devices$.subscribe(devices => this.handleDevices(devices))
  }

  handleDevices(devices: Array<Device>): void {
    _.each(devices, (device: Device) => {
      this.backend.getDeviceData(device.deviceID).subscribe((deviceData: Array<DeviceData>) => {
        this.createChart(deviceData)
      }, err => console.log(`failed to load device data ${err}`))
    })
  }

  createChart(deviceData: Array<DeviceData>): void {
    console.log(deviceData)
    if (_.find(deviceData, 'lightSensor') === undefined) return

    this.charts = [
      ...this.charts, {
        chart: { zoomType: 'x' },
        title: { text: 'Light Sensor' },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { time: '%h:%mm' },
          title: { text: 'Time' },
        },
        yAxis: {
          title: { text: 'Light levels' }
        },
        series: [{
          name: new Date((deviceData[0].timestamp) * 1000).toLocaleDateString(),
          data: _.reduce(deviceData, (acc, dataPoint: DeviceData) => {
            return [...acc, [dataPoint.timestamp * 1000, dataPoint.lightSensor]]
          }, [])
        }],
        legend: { enabled: false },
      }]

  }



  toggle(id: string) {
    this.backend.publish({ 'topic': `/toggle/${id}`, 'message': new Date() })
  }
}
