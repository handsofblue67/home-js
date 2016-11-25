import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { DextersLabService } from './'

@Component({
  selector: 'app-dexters-lab',
  templateUrl: './dexters-lab.component.html',
  styleUrls: ['./dexters-lab.component.css']
})
export class DextersLabComponent implements OnInit, OnDestroy {
  events: Array<any> = []
  connection: Subscription
  event: string = ''

  constructor(private dextersLabService: DextersLabService) { }

  ngOnInit() {
    this.connection = this.dextersLabService
      .getActivity()
      .subscribe(event => {
        this.events = event
      })
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }

}
