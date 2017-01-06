import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import * as feathers from 'feathers-client'
import * as io from 'socket.io-client'
import * as superagent from 'superagent'
import * as _ from 'lodash'

import { User } from './models'

@Injectable()
export class AuthService {
  private _url: string = 'http://localhost:3030'
  public feathersApp: any
  public token: string
  public message = ''
  public currentUser: User
  public socket = io(this._url)
  public authenticated = false

  constructor() {
    if (localStorage.getItem('feathers-jwt')) {
      this.feathersApp = feathers()
        .configure(feathers.socketio(this.socket))
        .configure(feathers.hooks())
        .configure(feathers.authentication({ storage: window.localStorage }))
    } else {
      this.feathersApp = feathers()
        .configure(feathers.rest(this._url).superagent(superagent))
        .configure(feathers.hooks())
        .configure(feathers.authentication({ storage: window.localStorage }))
    }
  }

  authenticate() {
    this.feathersApp.authenticate()
  }

  login(username: string, password: string): Observable<boolean> {
    return Observable.fromPromise(
      this.feathersApp.authenticate({
        type: 'local',
        strategy: 'local',
        username: username,
        password: password
      }))
      .map((result: any) => {
        console.log(result)
        this.token = result && result.token
        this.currentUser = result.data
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        this.authenticated = this.token ? true : false
        return this.authenticated
      })
      .catch(this.handleError)
  }

  tokenAuth(): Observable<any> {
    // Authenticating using a token instead
    return Observable.fromPromise(
      this.feathersApp.authenticate({
        type: 'token',
        'token': localStorage.getItem('feathers-jwt')
      }))
      .map((result: any) => {
        console.log(result)
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
    this.authenticated = false
  }

  private handleError(err: any) {
    let errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusTest}` : 'Server error'
    return Observable.throw(errMsg)
  }

  getService(route: string): Observable<any> {
    return this.authenticated ?
      Observable.of(this.feathersApp.service(route)) :
      this.tokenAuth().map(res => this.feathersApp.service(route))
  }
}
