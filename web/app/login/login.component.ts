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
  // login() {
  //   this.authService
  //     .login(this.model.username, this.model.password)
  //     .subscribe(result => {
  //       if (result) {
  //         // login successful
  //         console.log('login successful')
  //         this.router.navigate(['/devices'])
  //           .then(didRoute => console.log(`redirection ${didRoute ? 'succeeded' : 'failed'}`))
  //           .catch(console.warn)
  //       } else {
  //         // login failed
  //         console.log('login failed', result)
  //         this.error = this.authService.message
  //       }
  //     })
  // }
}
