import { Component, OnInit } from '@angular/core'

import { UsersService } from './users.service'

@Component({
  selector: 'app-users',
  template: `
    <div>
      <h1>Home</h1>
      <p>You're logged in with JWT!!</p>
      Users from secure api end point:
      <ul>
        <li *ngFor="let user of (usersService.users$ | async)">{{user?.firstName}} {{user?.lastName}}</li>
      </ul>
      <p><a href="" (click)="usersService.logout()">Logout</a></p>
      <a href="/auth/google">Login with Google</a>
    </div>`,
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(public usersService: UsersService) { }
  public ngOnInit(): void { }
}
