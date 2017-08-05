import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/skipWhile'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

// import feathers from 'feathers/client'
import * as feathers from 'feathers-client'
import authentication from 'feathers-authentication/client'
// import * as socketio from 'feathers-socketio/client'
// import * as hooks from 'feathers-hooks'
// import * as authentication from 'feathers-authentication-client'
import * as io from 'socket.io-client'
import * as _ from 'lodash'

import { User } from './models'

@Injectable()
export class AuthService {
  // private _url: string = 'http://localhost:3030'
  authenticated = false
  private authSource = new BehaviorSubject<boolean>(this.authenticated)
  public auth$ = this.authSource
    .asObservable()
    .skipWhile(x => x === false)
    .share()

  public currentUser
  private userSource = new BehaviorSubject<any>(this.currentUser)
  public user$ = this.userSource.asObservable().share()

  public feathersApp: any
  public token: string
  public message = ''
  // public socket = io('/')
  public socket = io('/', { transports: ['websocket'] })

  constructor(private router: Router) {
    this.feathersApp = feathers()
      .configure(feathers.socketio(this.socket))
      .configure(feathers.hooks())
      .configure(authentication({ cookie: 'feathers-jwt' }))

    this.initAuth()
  }

  private async initAuth() {
    try {
      const authResponse = await this.feathersApp.authenticate()
      console.info('Feathers Client has Authenticated with the JWT access token!')
      this.authenticated = true
      this.authSource.next(this.authenticated)
      const verifyJWTPayload = await this.feathersApp.passport.verifyJWT(authResponse.accessToken)
      const user = await this.feathersApp.service('users').get(verifyJWTPayload.userId)
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      this.userSource.next(this.currentUser)
    } catch (err) {
      this.router.navigate(['/login'])
      console.info('We have not logged in with OAuth, yet.  This means there\'s no cookie storing the accessToken.  As a result, feathersClient.authenticate() failed.')
      console.log(err)
    }
  }

  logout(): void {
    // clear token and remove user from local storage
    this.feathersApp.logout()
    this.token = null
    localStorage.removeItem('currentUser')
    localStorage.removeItem('feathers-jwt')
    this.currentUser = null
    this.authenticated = false
    this.router.navigate(['/login'])
  }

  private handleError(err: any) {
    const errMsg = err.message || err.status ?
      `${err.status} - ${err.statusTest}` : 'Server error'
    return Observable.throw(errMsg)
  }

  getService(route: string) {
    return this.feathersApp.service(route)
  }
}
