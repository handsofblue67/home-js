import { Injectable } from '@angular/core'

import 'rxjs/add/operator/map'
import { findIndex, without } from 'lodash'
import * as feathers from 'feathers-client'

import { AuthService } from '../auth.service'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription  } from 'rxjs/Subscription'

@Injectable()
export class UsersService {
  private userSource = new BehaviorSubject<any[]>([])
  users$ = this.userSource.asObservable().share()

  private feathersService: any
  private users = []
  authSubscription: Subscription

  constructor(private authService: AuthService) {
    this.feathersService = this.authService.getService('users')
    this.feathersService.find().then((update: any) => {
      const users = update.data
      this.users = users
      this.userSource.next(this.users)
    })
    this.feathersService
      .on('created', user => this.onCreated(user))
      .on('updated', user => this.onUpdated(user))
      .on('removed', user => this.onRemoved(user))
  }

  private getIndex(id: string): number {
    return findIndex(this.users, user => user.googleId === id)
  }

  private onCreated(user) {
    this.users = [...this.users, user]
    this.userSource.next(this.users)
  }

  private onUpdated(user) {
    const index = this.getIndex(user.googleId)
    this.users[index] = user
    this.userSource.next(this.users)
  }

  private onRemoved(user) {
    this.users = without(this.users, user)
    this.userSource.next(this.users)
  }

  logout(): void {
    this.authService.logout()
  }
}
