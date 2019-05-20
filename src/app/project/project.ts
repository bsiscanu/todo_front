import { Todo } from '../todo/todo';

export interface Project {
  _id?: string;
  name: string;
  todos: Array<Todo>;
}
