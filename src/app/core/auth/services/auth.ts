
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  role_type?: string;
  roles?: string[];
  permissions?: string[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api';
  private readonly tokenKey = 'gadgethub_token';
  private readonly userKey = 'gadgethub_user';

  constructor(private readonly http: HttpClient) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (!response.success || !response.data?.token || !response.data?.user) {
            throw new Error('Invalid login response from the server.');
          }

          localStorage.setItem(this.tokenKey, response.data.token);
          localStorage.setItem(
            this.userKey,
            JSON.stringify(response.data.user)
          );
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): AuthUser | null {
    const storedUser = localStorage.getItem(this.userKey);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      this.clearAuth();
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.getUser();

    if (!user) {
      return false;
    }

    const normalizedRole = role.trim().toLowerCase();

    return (
      user.roles?.some(
        assignedRole => assignedRole.toLowerCase() === normalizedRole
      ) === true ||
      user.role?.toLowerCase() === normalizedRole ||
      user.role_type?.toLowerCase() === normalizedRole
    );
  }

  logout(): Observable<unknown> {
    return this.http
      .post<unknown>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => this.clearAuth())
      );
  }

  clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
