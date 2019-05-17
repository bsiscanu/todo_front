import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';
import { Project } from '../project';
import { switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../todo/todo';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public projectForm: FormGroup;
  private project: Project;
  public active: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {

    this.project = new class implements Project {
      public name = '';
      public todos: Array<Todo> = [];
    };
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.subscription = this.route.params.pipe(
      switchMap(data => this.projectService.getOne(data.id)),
      tap(project => project ? this.project = project : '0_o')
    ).subscribe(() => {
      this.projectForm = this.formBuilder.group({
        name: [this.project.name, [Validators.required, Validators.minLength(3)]],
        todo: [this.project.todos ]
      });

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}




/**

 1. todos and projects doesn't appear when menu is changed
 2. left menu dissapear in mobile, no way to select data after collapse

 **/
