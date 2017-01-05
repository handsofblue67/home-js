import { Component, OnInit } from '@angular/core'

import { TodoService } from './'

@Component({
  selector: 'app-todos',
  // templateUrl: './todos.component.html',
  template: `<div>...everything...</div>`,
})
export class TodosComponent implements OnInit {

  // constructor(private todoService: TodoService) { }

  public ngOnInit(): void {
    // this.todoService.find()
  }
}
