import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';
import { env } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {

  private token: string;

  constructor(
    private http: HttpClient
  ) {

  }

  /**
   * Loads all project entities
   */
  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(env.projects, {
      headers: {
        // 'Content-Type':  'application/json',
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  /**
   * Gets a project by id
   */
  getOne(id: string): Observable<Project> {
    return this.http.get<Project>(`${env.projects}${id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  /**
   * Adds a new project entity
   */
  addOne(project: Project) {
    return this.http.post<Project>(`${env.projects}`, project, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  /**
   * Updates an existing project
   */
  setOne(id: string, project: Project) {
    return this.http.put<Project>(`${env.projects}${id}`, project, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  /**
   * Removes a project by id
   */
  remove(id: string) {
    return this.http.delete(`${env.projects}${id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    });
  }

}
