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
    this.groupedDevices = _.groupBy(devices, 'primaryType')
    this.createToggle(this.groupedDevices.digitalOutput)
    this.createChart(this.groupedDevices.analogInput)
  }

  createChart(devices: Array<Device>): void {
    this.charts = _.map(devices, device => {
      console.log(device.checkinFreq)
      _.each(device.status, status => console.log(status))
      return {
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
        // series: this.separateByDay(device.status),
        series: this.separateByDay(device.status),
      }
    })
  }

  separateByDay(deviceStatus: Array<DeviceStatus> | DeviceStatus) {
    let series = _.groupBy(deviceStatus, (dataPoint: DeviceStatus) => moment(+dataPoint.timestamp).startOf('day').format('MM/DD/YY'))
    return _.map(series, (dayOfData, date) => {
      return {
        name: date,
        data: _.reduce(dayOfData, (acc, dataPoint: DeviceStatus) => {
          return [...acc, moment(+dataPoint.timestamp).format("H:mm"), dataPoint.pins[0].status]
        }, [])
      }
    })
  }

  createToggle(device): void {
    // this.toggleDevices = [ ...this.toggleDevices, device ]
  }

    toggle(device: Device): void {
      let topic = device.topics.sub.toggle
      let mqtt = { topic: topic, message: (new Date()).toString() }
      this.backend.publish(mqtt).subscribe(console.log)
    }
}