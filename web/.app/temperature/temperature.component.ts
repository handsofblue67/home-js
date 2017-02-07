import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { TemperatureService } from './temperature.service'

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit, OnDestroy {
  states: Array<any> = []
  connection: Subscription

  constructor(private temperatureService: TemperatureService) { }

  ngOnInit() {
    this.connection = this.temperatureService
      .getTemps()
      .subscribe(states => this.states = states)
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }
}