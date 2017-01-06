import { Component, OnInit } from '@angular/core'

import { LightsService } from './lights.service'

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: [ './lights.component.css' ],
})
export class LightsComponent implements OnInit {

  constructor(private lightsService: LightsService) { }

  public ngOnInit(): void { }
}
// import { Component, OnInit, OnDestroy } from '@angular/core'

// import { Subscription } from 'rxjs/Subscription'

// import { LightsService } from './lights.service'
// import { Device } from '../models'

// @Component({
//   selector: 'app-lights',
//   templateUrl: './lights.component.html',
//   styleUrls: ['./lights.component.css']
// })
// export class LightsComponent implements OnInit, OnDestroy {
//   states: Array<any> = []
//   connection: Subscription

//   constructor(private lightsService: LightsService) { }

//   toggle(device: Device) { this.lightsService.toggle(device) }

//   ngOnInit() {
//     this.connection = this.lightsService
//       .getStates()
//       .subscribe(states => this.states = states)
//   }

//   ngOnDestroy() {
//     this.connection.unsubscribe()
//   }
// }
