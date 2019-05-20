import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { of, Subscription } from 'rxjs';
import { Project } from '../project';
import { switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../todo/todo';
import { TodoService } from '../../todo/todo.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public projectForm: FormGroup;
  private project: Project;
  public todos: Array<Todo>;
  public active: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService,
    private todoService: TodoService,
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
          return this.projectService.getOne(data.id);
        } else {
          return of(new class implements Project {
            public name = '';
            public todos: Array<Todo> = [];
          });
        }

      }),
      tap((project: Project) => this.project = project),
      switchMap(() => this.todoService.getAll())
    ).subscribe(todos => {
      this.projectForm = this.formBuilder.group({
        name: [this.project.name, [Validators.required, Validators.minLength(3)]],
        // todos: this.formBuilder.array([this.project.todos.map(todo => todo._id)])
      });

      this.todos = todos;
      this.active = true;

    });
  }


  onSubmit(value, valid) {
    if (valid) {
      if (this.project._id) {
        this.projectService.setOne(this.project._id, value)
          .subscribe(() => this.location.back());
      } else {
        this.projectService.addOne(value)
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
