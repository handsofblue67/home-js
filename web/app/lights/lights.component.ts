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
