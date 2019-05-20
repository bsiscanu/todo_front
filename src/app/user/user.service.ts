import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { env } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Payload } from './payload';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private http: HttpClient
  ) {

  }


  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(env.users);
  }

  public register(username: string, password: string) {
    return this.http.post(`${env.users}register`, {username, password}).pipe(
      tap((payload: Payload) => localStorage.setItem('token', payload.jwt))
    );
  }

  public login(username: string, password: string) {
    return this.http.post(`${env.users}login`, { username, password}).pipe(
      tap((payload: Payload) => localStorage.setItem('token', payload.jwt))
    );
  }

  public update(id: string, user: User) {
    return this.http.put(`${env.users}${id}`, user);
  }

  public getKey() {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
