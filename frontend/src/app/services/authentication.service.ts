import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LoginForm {
  email: string;
  password: string;
}
export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: number;
  role?: string;
  password?: string;
  confirmPassword?: string;
}
export function tokenGetter() {
  return localStorage.getItem('blog-token');
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>('http://localhost:3000/api/users/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          console.log(token);

          localStorage.setItem('blog-token', token.access_token);
          return token;
        })
      );
  }
  register(user: any) {
    return this.http
      .post<any>('http://localhost:3000/api/users/', user)
      .pipe(map((user) => user));
  }

  logout() {
    localStorage.removeItem('blog-token');
  }
}
