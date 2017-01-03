import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

import { AuthService } from './auth.service'
import { User } from './models'

@Injectable()
export class UserService {
  headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(
    private http: Http,
    private authService: AuthService) {
  }

  getUsers(): Observable<User[]> {
    // add authorization header with jwt token
    if (!this.headers['Authorization']) {
      this.headers.append('Authorization', this.authService.token)
    }
    const options = new RequestOptions({ headers: this.headers })
    // get users from api
    return this.http.get('user', options)
      .map((response: Response) => response.json())
  }
}
