import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { ToggleService } from './toggle.service'
import { Device } from '../models'

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit, OnDestroy {
  states: Array<any> = []
  connection: Subscription

  constructor(private toggleService: ToggleService) { }

  toggle(device: Device) { this.toggleService.toggle(device) }

  ngOnInit() {
    this.connection = this.toggleService.getState().subscribe(state => state)
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }
}
