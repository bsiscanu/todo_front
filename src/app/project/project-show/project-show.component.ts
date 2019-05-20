import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.css']
})
export class ProjectShowComponent implements OnInit, OnDestroy {

  private project: Project;
  private active: boolean;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService
  ) {

  }

  ngOnInit() {
    this.subscription = this.route.params.pipe(
      switchMap(data => this.projectService.getOne(data.id))
    ).subscribe(project => {

      this.project = project;
      this.active = true;

    });
  }

  onBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
