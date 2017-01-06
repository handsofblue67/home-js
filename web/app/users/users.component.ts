import { Component, OnInit } from '@angular/core'

import { UsersService } from './users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ],
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  public ngOnInit(): void { }
}


// import { Component, OnInit } from '@angular/core'

// import { User } from '../models'
// import { UserService } from '../user.service'

// @Component({
//   selector: 'app-Users',
//   templateUrl: './Users.component.html',
//   styleUrls: [ './Users.component.css' ]
// })

// export class UsersComponent implements OnInit {
//   users: User[] = []

//   constructor(private userService: UserService) { }

//   ngOnInit() {
//     // get users from secure api end point
//     this.userService.getUsers()
//       .subscribe(users => this.users = users)
//   }
// }
