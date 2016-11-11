import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription'

import { ToggleService } from './toggle.service'
import { Device, DeviceStatus, DeviceType, Mqtt } from '../models'

@Component({
  selector: 'toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit, OnDestroy {
  states: Array<any> = []
  connection: Subscription

  constructor(private toggleService: ToggleService) {
    // this.toggle = _.debounce((device: Device) => this.toggleService.toggleDevice(device), 200)
  }

  toggle(device: Device) { this.toggleService.toggle(device) }

  ngOnInit() {
    this.connection = this.toggleService.getState().subscribe(state => {
      // this.states = [ ...this.states, state ]
      // console.log(state)
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }
}