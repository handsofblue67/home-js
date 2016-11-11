import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import '../shared'

import * as moment from 'moment'

import { BackendService } from '../backend.service'
import { Device, DeviceType, DeviceStatus, Mqtt } from '../models'

@Injectable()
export class ChartService {
  devices: Array<Device>
  charts: Array<any> = []
  private chartSource = new BehaviorSubject<Array<any>>([])
  chart$ = this.chartSource.asObservable()

  constructor(private backend: BackendService) {
    backend.getDevicesByType('analogInput').subscribe(devices => {
      _.each(devices, device => {
         backend.getDeviceData(device)
          .subscribe(status => this.createChart(this.normalize(device, status)))
      })
    })
  }

  createChart(device: Device): void {
    this.charts = [
      ...this.charts, {
        chart: { zoomType: 'x', type: 'line' },
        title: { text: 'Light Sensor' },
        xAxis: {
          type: 'datetime',
          title: { text: 'Time' },
          dateTimeFormat: {
            day: 'HH:mm:ss'
          }
        },
        yAxis: { title: { text: 'Light levels' } },
        series: this.separateByDay(device.status),
    }]
    this.chartSource.next(this.charts)
  }

  separateByDay(deviceStatus: Array<DeviceStatus> | DeviceStatus) {
    return _
      .chain(deviceStatus)
      .groupBy((dataPoint: DeviceStatus) => {
        return moment(+dataPoint.timestamp).startOf('day').format('MM/DD/YY')
      })
      .map((dayOfData, date) => {
        return {
          name: date,
          data: _.reduce(dayOfData, (acc, dataPoint: DeviceStatus) => {
              let time = new Date(+dataPoint.timestamp)
              time.setDate(1)
              time.setMonth(1)
              time.setFullYear(1971)
              return [...acc, [+moment(+time), dataPoint.pins[0].status]]
            }, [])
        }
      })
      .value()
  }

  private normalize(device: Device, statuses: Array<DeviceStatus>): Device {
    return {
      deviceID: device.deviceID,
      name: device.name,
      topics: device.topics,
      timestamp: device.timestamp,
      primaryType: device.primaryType,
      status: statuses,
      checkinFreq: device.checkinFreq,
    }
  }

  private getData(device: Device) {
    let updatedDevice;
    this.backend.getDeviceData(device)
      .subscribe(status => updatedDevice = this.normalize(device, status))
    return updatedDevice
  }  
}
