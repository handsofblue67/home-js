import { Component } from '@angular/core';

import { ChartService } from './chart.service'
import { Device, DeviceStatus, DeviceType, Mqtt } from '../models'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  constructor(private chartService: ChartService) { }

}
