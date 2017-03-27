import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/skipWhile'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import * as feathers from 'feathers-client'
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
  public feathersApp: any
  public token: string
  public message = ''
  public currentUser: User
  public socket = io('/')

  constructor(private router: Router) {
    this.feathersApp = feathers()
      .configure(feathers.socketio(this.socket))
      .configure(feathers.hooks())
      .configure(feathers.authentication({ storage: localStorage }))
    this.tokenLogin()
  }

  private tokenLogin(): void {
    // check local storage for a valid token, redirect accordingly
    this.feathersApp.authenticate().then(() => {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      this.authenticated = true
      this.authSource.next(this.authenticated)
      // TODO: make this route dynamic based off user preferences
      this.router.navigate([ `/${this.currentUser.onLoginRoute || 'devices'}`])
    }).catch(error => {
      this.router.navigate(['/login'])
      console.error(error)
    })
  }

  login(username: string, password: string) {
    this.feathersApp.configure(feathers.authentication({ storage: localStorage }))
    return Observable.fromPromise(
      this.feathersApp.authenticate({
        type: 'local',
        username: username,
        password: password
      }))
      .map((result: any) => {
        this.token = result && result.token
        this.currentUser = result.data
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        this.authenticated = this.token ? true : false
        if (this.token) {
          this.tokenLogin()
        }
        return this.authenticated
      })
      .catch(this.handleError)
  }

  logout(): void {
    // clear token and remove user from local storage
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
