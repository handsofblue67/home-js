import { Injectable } from '@angular/core'
import { Observable, Observer } from 'rxjs'
import * as io from 'socket.io-client'
import * as feathers from 'feathers-client'
import * as _ from 'lodash'

export class Todo {
  id: string
  title: string
}

@Injectable()
export class TodoService {

  private _url: string = 'localhost:3030'
  public todos$: Observable<Todo[]>
  private todosObserver: Observer<Todo[]>
  private feathersService: any

  private dataStore: { todos: Todo[] }

  constructor() {
    const socket = io(this._url)
    const feathersApp = feathers().configure(feathers.socketio(socket))
    this.feathersService = feathersApp.service('todos')

    this.feathersService.on('created', (todo) => this.onCreated(todo))
    this.feathersService.on('updated', (todo) => this.onUpdated(todo))
    this.feathersService.on('removed', (todo) => this.onRemoved(todo))

    this.todos$ = <Observable<Todo[]>>new Observable(observer => this.todosObserver = observer)
    .share()

    this.dataStore = { todos: [] }
  }

  public find() {
    this.feathersService.find((err, todos: Todo[]) => {
      if (err) return console.error(err)

      this.dataStore.todos = todos
      this.todosObserver.next(this.dataStore.todos)
    })
  }

  private getIndex(id: string): number {
    return _.findIndex(this.dataStore.todos, todo => todo.id === id)
  }

  private onCreated(todo: Todo) {
    this.dataStore.todos = [...this.dataStore.todos, todo ]
    this.todosObserver.next(this.dataStore.todos)
  }

  private onUpdated(todo: Todo) {
    const index = this.getIndex(todo.id)

    this.dataStore.todos[index] = todo

    this.todosObserver.next(this.dataStore.todos)
  }

  private onRemoved(todo) {
    this.dataStore.todos = _.without(this.dataStore.todos, todo)
    this.todosObserver.next(this.dataStore.todos)
  }
}
