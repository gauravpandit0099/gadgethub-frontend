
import { Component, inject } from '@angular/core';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = false;
  showPassword = false;
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.loading) {
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const credentials = this.loginForm.getRawValue();

    this.authService
      .login(credentials)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: response => {
          const user = response.data.user;

          // Prefer the assigned roles array; fall back to role fields.
          const assignedRoles = [
            ...(user.roles ?? []),
            user.role_type ?? '',
            user.role ?? ''
          ].map(role => role.trim().toLowerCase());

          if (assignedRoles.includes('admin')) {
            void this.router.navigateByUrl('/admin');
            return;
          }

          if (assignedRoles.includes('user')) {
            void this.router.navigateByUrl('/user');
            return;
          }

          // Do not retain a session for an unsupported role.
          this.authService.clearAuth();
          this.errorMessage =
            'Your account does not have a supported role. Please contact the administrator.';
        },

        error: (error: unknown) => {
          if (error instanceof HttpErrorResponse) {
            const serverMessage = this.getServerErrorMessage(error);

            if (error.status === 0) {
              this.errorMessage =
                'Unable to connect to the server. Please check that the Laravel API is running.';
            } else {
              this.errorMessage =
                serverMessage ||
                'Unable to sign in. Please check your email and password.';
            }
          } else if (error instanceof Error) {
            this.errorMessage = error.message;
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again.';
          }
        }
      });
  }

  private getServerErrorMessage(
    error: HttpErrorResponse
  ): string | null {
    const body: unknown = error.error;

    if (
      typeof body === 'object' &&
      body !== null &&
      'message' in body &&
      typeof body.message === 'string'
    ) {
      return body.message;
    }

    return null;
  }
}
