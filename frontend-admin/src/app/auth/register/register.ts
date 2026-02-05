import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertHelper } from '../../helpers/alert-helper';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  formData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService, private alert: AlertHelper) { }

  onSubmit() {
    this.authService.register(this.formData).subscribe({
      next: () => {
        this.alert.show('Account created successfully', 'success');
        this.resetForm();
      },
      error: (err) => {
        if (err.status === 400 && err.error?.errors) {
          const key = Object.keys(err.error.errors)[0];
          this.alert.show(err.error.errors[key][0], 'error');
        } else {
          this.alert.show('Something went wrong', 'error');
        }
      }
    });
  }

  private resetForm() {
    this.formData = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }
}
