import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  singupModel,
  AuthResData,
  loginModel,
  User,
} from '../models/auth.interface';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(account: singupModel) {
    return this.http
      .post<AuthResData>('http://localhost:8000/api/v1/account/signup', account)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error)),
        tap((res) => {
          console.log(res);
        })
      );
  }

  login(account: loginModel) {
    return this.http
      .post<AuthResData>('http://localhost:8000/api/v1/account/login', account)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error)),
        tap((res) => {
          this.handleAuth(res);
        })
      );
  }

  autologin() {
    const userData: AuthResData | null = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.user_id ?? '',
      userData.email ?? '',
      userData.username ?? '',
      userData.name ?? '',
      userData.token ?? '',
      userData.is_admin ?? false
    );

    this.user.next(loadedUser);
    return;
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = 'An unknown error occurred';
    if (!error.error) {
      return throwError(() => errorMessage);
    }
    if (error.error.non_field_errors) {
      errorMessage = error.error.non_field_errors[0];
    }
    if (error.error.email) {
      errorMessage = error.error.email[0];
    }
    if (error.error.username) {
      errorMessage = error.error.username[0];
    }
    return throwError(() => errorMessage);
  }

  private handleAuth(res: AuthResData) {
    const user = new User(
      res.user_id ?? '',
      res.email ?? '',
      res.username ?? '',
      res.name ?? '',
      res.token ?? '',
      res.is_admin ?? false
    );
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserId(): string {
    const userData: AuthResData | null = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    if (userData && userData.user_id) {
      return userData.user_id;
    }

    return ''; // Return an empty string or handle the case when user_id is not available
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
