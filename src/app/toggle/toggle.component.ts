import { Component } from '@angular/core';

import { ToggleService } from '../toggle.service'
import { Device, DeviceStatus, DeviceType, Mqtt } from '../models'

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  toggle: Function

  constructor(private toggleService: ToggleService) {
    this.toggle = _.debounce((device: Device) => this.toggleService.toggleDevice(device), 200)
  }
}
