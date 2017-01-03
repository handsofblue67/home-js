import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import * as _ from 'lodash'


import { User } from './models'

@Injectable()
export class AuthService {
  public token: string
  public message = ''
  public currentUser: User

  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.currentUser = <User>_.pick(currentUser, ['username', 'firstname', 'lastName', 'picture'])
    this.token = currentUser && currentUser.token
  }

  login(username: string, password: string): Observable<boolean> {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers })
    return this.http.post('auth/local', JSON.stringify({ username: username, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().token

        if (token) {
          // set token property
          this.token = token

          this.currentUser = <User>_.assign(
            {},
            _.pick(response.json(), ['firstName', 'lastName', 'picture']),
            {username: username})

          console.log(this.currentUser)

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(
            _.assign({}, this.currentUser, {token: token})))

          // return true to indicate successful login
          return true
        } else {
          // return false to indicate failed login
          this.message = response.json().message
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
