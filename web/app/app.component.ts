import { Component } from '@angular/core'

import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  atTop: boolean = true
  constructor(private authService: AuthService) { }

  scrolling(event: any) {
    console.log(event.target.value)
  }
}
