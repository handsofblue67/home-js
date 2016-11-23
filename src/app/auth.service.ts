import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  public token: string
  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.token = currentUser && currentUser.token
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token
        if (token) {
          // set token property
          this.token = token

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }))

          // return true to indicate successful login
          return true
        } else {
          // return false to indicate failed login
          return false
        }
      })
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null
    localStorage.removeItem('currentUser')
  }
}

// import { Injectable } from '@angular/core'
// import { tokenNotExpired } from 'angular2-jwt'
// import { Router } from '@angular/router'

// import * as _ from 'lodash'

// declare var Auth0Lock: any

// @Injectable()
// export class AuthService {
//   // We'll use the Auth0 Lock widget for capturing user credentials
//   lockOptions = {
//     // auth: {
//     //   responseType: 'token',
//     // },
//     allowSignUp: false
//   }
//   lock = new Auth0Lock('US8c50SXMeTQH8LD0axQj3prPHKDok0W', 'handsofblue67.auth0.com', this.lockOptions)

//   constructor(private router: Router) {
//     // We'll listen for an authentication event to be raised and if successful will log the user in.
//     this.lock.on('authenticated', (authResult: any) => {
//       localStorage.setItem('id_token', authResult.idToken)

//       this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
//         if (error) { console.log(error) }

//         localStorage.setItem('profile', JSON.stringify(profile))
//       })
//       router.navigate(['/lights'])
//       this.lock.hide()
//     })
//   }

//   nonce(): string {
//     let text = []
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     return _.chain(text)
//       .fill(() => possible.charAt(Math.random() * possible.length))
//       .join('')
//       .value()
//   }

//   // This method will display the lock widget
//   login(): void { this.lock.show() }

//   // This method will log the use out
//   logout(): void {
//     // To log out, just remove the token and profile
//     // from local storage
//     localStorage.removeItem('profile')
//     localStorage.removeItem('id_token')

//     // Send the user back to the public deals page after logout
//     this.router.navigate(['/'])
//   }

//   // Finally, this method will check to see if the user is logged in. We'll be able to tell by checking to see if they have a token and whether that token is valid or not.
//   loggedIn(): boolean {
//     return tokenNotExpired()
//   }
// }
