import { Component, OnInit } from '@angular/core';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects: Array<Project>;

  constructor(
    private projectService: ProjectService
  ) {

  }

  ngOnInit() {
    this.projectService.getAll()
      .subscribe(projects =>
        this.projects = projects
      );
  }

  onRemove(id: string) {
    this.projectService.remove(id).subscribe((project: Project) =>
      this.projects.splice(this.projects.indexOf(project), 1)
    );
  }

}
