// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment as env } from "../../../environments/environment";
import { Observable, of, map, tap } from 'rxjs';
import { endpoint } from '../../shared/endpoint';
import { AuthUserResponse } from '../../features/auth/models/AuthUserResponse';
import { AuthRegisterRequest, AuthUserRequest } from '../../features/auth/models/AuthUserRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient, private router: Router) {}

login(req: AuthUserRequest): Observable<AuthUserResponse> {
  const requestUrl = `${env.apiBaseUrl}${endpoint.LOGIN}`;

  return this.http.post<AuthUserResponse>(requestUrl, req).pipe(
    tap(response => {
      if (response.isSuccess) {
          localStorage.setItem('usuario', JSON.stringify(response));
          //localStorage.setItem(this.TOKEN_KEY, response.accessToken);
      }
    }),
    map(response => response)
  );
}

register(req: AuthRegisterRequest): Observable<boolean> {
  const requestUrl = `${env.apiBaseUrl}${endpoint.REGISTER}`;

  return this.http.post<boolean>(requestUrl,req).pipe(
    tap(response => {
    }),
    map(response => response)
  );
}

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    // TODO: validar si el token expiró
    return !!token;
  }

  check(): Observable<boolean> {
    return of(this.isAuthenticated());
  }
}
