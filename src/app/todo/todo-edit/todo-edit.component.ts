import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from '../todo';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private todoForm: FormGroup;
  private todo: Todo;
  public active: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {

    this.todo = new class implements Todo {
      public label = '';
      public endDate = new Date();
      public status = false;
    };
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.subscription = this.route.params.pipe(
      switchMap(data => this.todoService.getOne(data.id)),
      tap(todo => todo ? this.todo = todo : 'o_0')
    ).subscribe(() => {
      this.todoForm = this.formBuilder.group({
        label: [this.todo.label, [Validators.required, Validators.minLength(3)]],
        endDate: [this.todo.endDate],
        status: [this.todo.status]
      });

      this.active = true;
    });
  }

  onSubmit(value, valid) {
    if (valid) {
      if (this.todo._id) {
        this.todoService.setOne(this.todo._id, value)
          .subscribe(() => this.location.back());
      } else {
        this.todoService.addOne(value)
          .subscribe(() => this.location.back());
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
