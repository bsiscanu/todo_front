import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { Todo } from '../todo';
import { switchMap, tap } from 'rxjs/operators';
import { ProjectService } from '../../project/project.service';
import { Project } from '../../project/project';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private todoForm: FormGroup;
  private todo: Todo;
  public projects: Array<Project>;
  public active: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private todoService: TodoService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.subscription = this.route.params.pipe(
      switchMap(data => {

        if (data && data.id) {
          return this.todoService.getOne(data.id);
        } else {
          return of(new class implements Todo {
            public label = '';
            public endDate = new Date();
            public status = false;
            public project;
          });
        }

      }),
      tap((todo: Todo) => this.todo = todo),
      switchMap(() => this.projectService.getAll())
    ).subscribe(projects => {
      this.todoForm = this.formBuilder.group({
        label: [this.todo.label, [Validators.required, Validators.minLength(3)]],
        endDate: [this.todo.endDate],
        status: [this.todo.status],
        project: [this.todo.project]
      });

      this.projects = projects;
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

  onBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
