import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import './shared'

import * as moment from 'moment'

import { BackendService } from './backend.service'
import { Device, DeviceType, DeviceStatus, Mqtt } from './models'

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
    this.charts = [ ...this.charts, {
      chart: {
        zoomType: 'x',
        type: 'line'
      },
      title: { text: 'Light Sensor' },
      xAxis: {
        type: 'datetime',
        title: { text: 'Time' },
      },
      yAxis: {
        title: { text: 'Light levels' }
      },
      series: this.separateByDay(device.status),
    }]
    this.chartSource.next(this.charts)
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
