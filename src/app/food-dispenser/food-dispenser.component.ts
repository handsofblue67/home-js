import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { FoodDispenserService } from './food-dispenser.service'

@Component({
  selector: 'app-food-dispenser',
  templateUrl: './food-dispenser.component.html',
  styleUrls: ['./food-dispenser.component.css']
})
export class FoodDispenserComponent implements OnInit, OnDestroy {
  currentStatus
  connection: Subscription

  constructor(private foodDispenserService: FoodDispenserService) { }

  ngOnInit() {
    this.connection = this.foodDispenserService
      .getStatus()
      .subscribe(currentStatus => this.currentStatus = currentStatus)
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }

  update(clock, duty) {
    this.foodDispenserService.updateStatus({ clock: clock, duty: duty })
  }
}
