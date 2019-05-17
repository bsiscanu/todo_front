import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';
import { Project } from '../project';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  private subscription: Subscription;
  public projectForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.subscription = this.route.params.pipe(
      switchMap(data => this.projectService.getOne(data.id))
    ).subscribe(project =>
      this.projectForm = this.formBuilder.group({
        name: [project.name || '', [Validators.required, Validators.minLength(3)]],
        todo: [project.todos || [] ]
      })
    );

  }

  onSubmit(value, valid) {
    if (valid) {

    }
  }
}
