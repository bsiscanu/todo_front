import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  public todos: Array<Todo>;

  constructor(
    private todoService: TodoService
  ) {

  }

  ngOnInit() {
    this.todoService.getAll()
      .subscribe(todos =>
        this.todos = todos
      );
  }

  onRemove(id: string) {
    this.todoService.remove(id).subscribe((todo: Todo) =>
      this.todos.splice(this.todos.indexOf(todo), 1)
    );
  }

}
