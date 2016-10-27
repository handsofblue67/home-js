import { Component } from '@angular/core'

import * as _ from 'lodash'
import * as moment from 'moment'
// import * as mqtt from 'mqtt'

import { BackendService } from './backend.service'
import { Device, DeviceData } from './models'

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
        series: this.separateByDay(deviceData),
        // legend: { enabled: false },
      }]
  }

  separateByDay(deviceData: Array<DeviceData>) {
    let series = _.groupBy(deviceData, dataPoint => moment(dataPoint.timestamp).startOf('day').format('MM/DD/YY'))
    return _.map(series, (dayOfData, date) => {
      return {
        name: date,
        data: _.reduce(dayOfData, (acc, dataPoint: DeviceData) => {
          return [...acc, [moment(dataPoint.timestamp).format('hh:mm'), dataPoint.lightSensor]]
        }, [])
      }
    })
  }

  toggle(id: string) {
    this.backend.publish({ 'topic': `/toggle/${id}`, 'message': new Date() })
  }
}
