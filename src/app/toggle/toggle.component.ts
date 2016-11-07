import { Component, OnInit, OnDestroy } from '@angular/core';

import { ToggleService } from './toggle.service'
import { Device, DeviceStatus, DeviceType, Mqtt } from '../models'

@Component({
  selector: 'toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit, OnDestroy {
  toggle: Function
  
  states: Array<any> = []
  connection

  constructor(private toggleService: ToggleService) {
    this.toggle = _.debounce((device: Device) => this.toggleService.toggleDevice(device), 200)
  }

  doToggle() {
    this.toggleService.toggle()
  }

  ngOnInit() {
    this.connection = this.toggleService.getState().subscribe(state => {
      this.states = [ ...this.states, state ]
      console.log(state)
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }

}
