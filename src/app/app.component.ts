import { Component } from '@angular/core'

import * as _ from 'lodash'
import * as moment from 'moment'
// import * as mqtt from 'mqtt'

import { BackendService } from './backend.service'
import { Device, DeviceData, Mqtt } from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  charts: Array<any> = []
  devices: Array<Device>
  toggleDevices: Array<Device> = []

  constructor(private backend: BackendService) {
    backend.devices$.subscribe(devices => this.handleDevices(devices))
  }

  handleDevices(devices: Array<Device>): void {
    _.each(devices, (device: Device) => {
      this.backend.getDeviceData(device.deviceID).subscribe((deviceData: Array<DeviceData>) => {
        this.createChart(deviceData)
        this.createToggle(deviceData)
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
          dateTimeLabelFormats: {
            second: '%H:%M:%S',
          },
          title: { text: 'Time' },
        },
        yAxis: {
          title: { text: 'Light levels' }
        },
        series: this.separateByDay(deviceData),
      }]
  }

  separateByDay(deviceData: Array<DeviceData>) {
    let series = _.groupBy(deviceData, dataPoint => moment(+dataPoint.timestamp * 1000).startOf('day').format('MM/DD/YY'))
    return _.map(series, (dayOfData, date) => {
      return {
        name: date,
        data: _.reduce(dayOfData, (acc, dataPoint: DeviceData) => {
          return [...acc, [moment(+dataPoint.timestamp * 1000).format('hh:mm'), dataPoint.lightSensor]]
        }, [])
      }
    })
  }

  createToggle(deviceData: Array<DeviceData>): void {
   let toggleable =  _.find(deviceData, ['type', 'toggle'])
    if (toggleable === undefined) return
    this.toggleDevices = [
      ...this.toggleDevices, 
      { deviceID: toggleable.deviceID, deviceData: deviceData}
    ]
  }

  toggle(deviceData: Array<DeviceData>): void {
    let data = _.find(deviceData, 'topics.subscribe.toggle')
    if (data === undefined) return

    let topic = data.topics.subscribe.toggle
    let mqtt = { topic: topic, message: (new Date()).toString() }
    this.backend.publish(mqtt).subscribe(console.log)
  }
}
