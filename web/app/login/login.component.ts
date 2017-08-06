import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {}
  loading = false
  error = ''

  constructor(public router: Router, public authService: AuthService) { }

  async login() {
    try {
      const result = await this.authService.login(this.model.username, this.model.password)
      console.log('login successful')
      const didRoute = await this.router.navigate(['/devices'])
      console.log(`redirection ${didRoute ? 'succeeded' : 'failed'}`)
    } catch (err) {
      console.log('login failed', err)
      this.error = this.authService.message
    }
  }
}
