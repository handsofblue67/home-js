import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.auth$.map(loggedIn => {
      if (loggedIn) { return true }

      this.router.navigate(['/login'])
      return false
    }).take(1)
  }
}
