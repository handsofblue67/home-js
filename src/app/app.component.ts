import { Component } from '@angular/core'

// import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = localStorage.getItem('currentUser')
  // constructor(private auth: AuthService) { }
}