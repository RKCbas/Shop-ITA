import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordInputComponent } from '@auth/components/password-Input/password-Input.component';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [
    PasswordInputComponent,
    RouterLink,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
})
export class LoginPage {

  isPosting = signal(false);

  hasError = signal(false);
  fadeState = signal('');
  errorMessage = signal('Por favor revise la información ingresada')

  private readonly authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)

  private readonly router = inject(Router)

  loginForm = this.fb.group({
    email: [],
    password: []
  })

  get passwordControl(): FormControl {
    return this.loginForm.get('password')! as FormControl
  }

  showErrorMessage() {
    if (this.hasError() === true) return;

    this.fadeState.set('animate-fadeIn');

    this.hasError.set(true);

    setTimeout(() => {
      this.fadeState.set('animate-fadeOut');
      setTimeout(() => {
        this.hasError.set(false);
      }, 1000);
    }, 2000)

  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.showErrorMessage();
    }

    if (this.isPosting()) return;

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!)



  }

}
