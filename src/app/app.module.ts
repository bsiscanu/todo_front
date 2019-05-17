import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoShowComponent } from './todo/todo-show/todo-show.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectShowComponent } from './project/project-show/project-show.component';
import { TodoComponent } from './todo/todo.component';
import { ProjectComponent } from './project/project.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'todos', children: [
    { path: 'list', component: TodoComponent },
    { path: 'new', component: TodoEditComponent },
    { path: 'edit/:id', component: TodoEditComponent },
    { path: 'show/:id', component: TodoShowComponent }
  ]},
  { path: 'projects', children: [
    { path: 'list', component: ProjectComponent },
    { path: 'new', component: ProjectEditComponent },
    { path: 'edit/:id', component: ProjectEditComponent },
    { path: 'show/id', component: ProjectShowComponent }
  ]},
  { path: '**', redirectTo: '/projects/list' }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoEditComponent,
    TodoShowComponent,
    TodoComponent,
    ProjectEditComponent,
    ProjectShowComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
