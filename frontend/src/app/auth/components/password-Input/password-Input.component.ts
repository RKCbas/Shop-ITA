import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './password-Input.component.html',
  standalone: true
})
export class PasswordInputComponent {

  control = input.required<FormControl>();
  placeholder = input<string>("Password");

  showPassword = signal<boolean>(false);

  toggleVisibility() {
    this.showPassword.set(!this.showPassword())
  }
}
