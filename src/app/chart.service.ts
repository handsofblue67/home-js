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
    backend.getDevicesByType('digitalOutput').subscribe(devices => {
      this.createChart(devices)
      this.devices = _.map(devices, device => {
        let curriedNormalize;
        backend.getDeviceData(device).subscribe(status => curriedNormalize = this.normalize(status))
        return curriedNormalize(device)
      })
    })
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

  private normalize(statuses: Array<DeviceStatus>): (device: Device) => Device {
    return (device: Device): Device => {
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
  }  
}
