import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { BrokerService } from './broker.service'

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css']
})
export class BrokerComponent implements OnInit, OnDestroy {
  log: Array<string> = []
  connection: Subscription
  systemMessages: boolean = false

  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
    this.connection = this.brokerService.getLog().subscribe(event => {
      this.log = [ event, ...this.log ]
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }

}
