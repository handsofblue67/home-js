import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/take'

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router, public authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.auth$.map(loggedIn => {
      if (loggedIn) { return true }

      this.router.navigate(['/login'])
      return false
    }).take(1)
  }
}
