import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordInputComponent } from '@auth/components/password-Input/password-Input.component';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '../../../utils/formUtils';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [
    PasswordInputComponent,
    RouterLink,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './register-page.html',
  standalone: true
})
export class RegisterPage {

  isPosting = signal(false);

  hasError = signal(false);
  fadeState = signal('');
  errorMessage = signal('Por favor revise la información ingresada')

  private readonly authService = inject(AuthService)
  private readonly fb = inject(FormBuilder);

  private readonly router = inject(Router);

  registerForm = this.fb.group({
    fullName: [],
    email: [],
    password1: [],
    password2: [],
  }, {
    validators: [
      FormUtils.isFieldOneEqualFieldTwo('password1', 'password2')
    ]
  })

  get passwordControl1(): FormControl {
    return this.registerForm.get('password1')! as FormControl
  }

  get passwordControl2(): FormControl {
    return this.registerForm.get('password2')! as FormControl
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

    if (this.registerForm.invalid) {
      this.showErrorMessage();
    }

    if (this.isPosting()) return;

    const { fullName = '', email = '', password1 = '' } = this.registerForm.value;

    this.authService.register(fullName!, email!, password1!).subscribe(isAuthenticated => {

      if (isAuthenticated) {
        this.router.navigateByUrl('/products', { replaceUrl: true })
        return
      }

      this.isPosting.set(false);
      alert(this.errorMessage());
      return;

    });

  }

}
