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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './user/guards/auth.guard';
import { JwtInterceptor } from './user/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './user/interceptors/error.interceptor';

const routes: Routes = [
  { path: 'todos', canActivate: [AuthGuard], children: [
    { path: 'list', component: TodoComponent },
    { path: 'new', component: TodoEditComponent },
    { path: 'edit/:id', component: TodoEditComponent },
    { path: 'show/:id', component: TodoShowComponent }
  ]},
  { path: 'projects', canActivate: [AuthGuard], children: [
    { path: 'list', component: ProjectComponent },
    { path: 'new', component: ProjectEditComponent },
    { path: 'edit/:id', component: ProjectEditComponent },
    { path: 'show/id', component: ProjectShowComponent }
  ]},
  { path: 'users', children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
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
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
