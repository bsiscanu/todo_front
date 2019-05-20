import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { env } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Payload } from './payload';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private http: HttpClient
  ) {

  }


  public register(username: string, password: string) {
    return this.http.post(`${env.user}register`, {username, password}).pipe(
      tap((payload: Payload) => localStorage.setItem('token', payload.jwt))
    );
  }

  public login(username: string, password: string) {
    return this.http.post(`${env.user}login`, { username, password}).pipe(
      tap((payload: Payload) => localStorage.setItem('token', payload.jwt))
    );
  }

  public update(id: string, user: User) {
    return this.http.put(`${env.user}${id}`, user);
  }

  public getKey() {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
