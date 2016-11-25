import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../auth.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})

export class LoginComponent implements OnInit {
  model: any = {}
  loading = false
  error = ''

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // reset login status
    this.authService.logout()
  }

  login() {
    this.loading = true
    this.authService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          console.log('login successful')
          this.loading = false
          this.router.navigate(['/home'])
        } else {
          // login failed
          console.log('login failed')
          this.error = 'Username or password is incorrect'
          this.loading = false
        }
      })
  }
}
