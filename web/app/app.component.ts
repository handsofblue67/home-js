import { Component } from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material'

import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  atTop: boolean = true
  constructor(
    public authService: AuthService,
    public iconRegistry: MdIconRegistry,
    public sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon('homejs',
      sanitizer.bypassSecurityTrustResourceUrl('assets/homejs.svg'))
  }

  scrolling(event: any) {
    console.log(event.target.value)
  }
}
