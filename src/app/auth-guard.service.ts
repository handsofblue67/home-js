import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
// Import our authentication service

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    // If user is not logged in we'll send them to the homepage 
    if (localStorage.getItem('currentUser')) { return true }

    this.router.navigate(['/login'])
    return false
  }
}