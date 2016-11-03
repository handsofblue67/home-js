import { Component } from '@angular/core'

import * as _ from 'lodash'
import * as moment from 'moment'
// import * as mqtt from 'mqtt'

import { BackendService } from './backend.service'
import { Device, DeviceStatus, DeviceType, Mqtt } from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  charts: Array<any> = []
  devices: Array<Device>
  toggleDevices: Array<Device> = []
  groupedDevices: any

  constructor(private backend: BackendService) {
    backend.devices$.subscribe(devices => this.handleDevices(devices))
  }

  handleDevices(devices: Array<Device>): void {
    this.devices = devices
    this.groupedDevices = _.groupBy(this.devices, 'primaryType')
    this.createToggle(this.groupedDevices.digitalOutput)
    this.createChart(this.groupedDevices.analogInput)
  }

  createChart(devices: Array<Device>): void {
    this.charts = _.map(devices, device => {
      return {
        chart: {
          zoomType: 'x',
          type: 'line'
        },
        title: { text: 'Light Sensor' },
        xAxis: {
          type: 'datetime',
          title: { text: 'Time' },
          dateTimeFormat: {

          }
        },
        yAxis: {
          title: { text: 'Light levels' }
        },
        series: this.separateByDay(device.status),
      }
    })
  }

  separateByDay(deviceStatus: Array<DeviceStatus> | DeviceStatus) {
    let series = _.groupBy(deviceStatus, (dataPoint: DeviceStatus) => moment(+dataPoint.timestamp).utcOffset(0).startOf('day').format('MM/DD/YY'))
    return _.map(series, (dayOfData, date) => {
      return {
        name: date,
        data: _.reduce(dayOfData, (acc, dataPoint: DeviceStatus) => {
          return [...acc, [+moment(+dataPoint.timestamp), dataPoint.pins[0].status]]
        }, []),
      }
    })
  }

  createToggle(devices: Array<Device>): void {
    this.toggleDevices = devices
  }

  toggle(device: Device): void {
    let topic = device.topics.sub.toggle
    let mqtt = { topic: topic, message: (new Date()).toString() }
    this.backend.publish(mqtt).subscribe(res => console.log(res))
  }
}