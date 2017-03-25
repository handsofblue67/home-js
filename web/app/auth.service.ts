import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Router } from '@angular/router'

import 'rxjs/add/operator/map'
import * as feathers from 'feathers-client'
import * as io from 'socket.io-client'
import * as _ from 'lodash'

import { User } from './models'

@Injectable()
export class AuthService {
  // private _url: string = 'http://localhost:3030'
  authenticated = false
  private authSource = new BehaviorSubject<boolean>(this.authenticated)
  public auth$ = this.authSource.asObservable().skipWhile(x => x === false).share()
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
    this.feathersApp.authenticate().then(() => {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      this.authenticated = true
      this.authSource.next(this.authenticated)
    }).catch(error => {
      // if (error.code === 401) {
        router.navigate(['/login'])
      // }
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
        return this.authenticated
      })
      .catch(this.handleError)
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null
    localStorage.removeItem('currentUser')
    localStorage.removeItem('feathers-jwt')
    this.currentUser = null
    this.authenticated = false
    this.router.navigate(['/login'])
  }

  private handleError(err: any) {
    let errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusTest}` : 'Server error'
    return Observable.throw(errMsg)
  }

  getService(route: string) {
    return this.feathersApp.service(route)
  }


}