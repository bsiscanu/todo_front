import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environments/environment';
import { Todo } from './todo';


@Injectable({ providedIn: 'root' })
export class TodoService {

  public todos: Array<Todo>;

  constructor(
    private http: HttpClient
  ) {

  }

  /**
   * Loads all todo entities
   */
  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(env.todos);
  }

  /**
   * Gets a todo by id
   */
  getOne(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${env.todos}${id}`);
  }

  /**
   * Adds a new todo entity
   */
  addOne(todo: Todo) {
    return this.http.post<Todo>(`${env.todos}`, todo, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  /**
   * Updates an existing todo
   */
  setOne(id: string, todo: Todo) {
    return this.http.put<Todo>(`${env.todos}${id}`, todo, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  /**
   * Removes a todo by id
   */
  remove(id: string) {
    return this.http.delete(`${env.todos}${id}`);
  }
}
