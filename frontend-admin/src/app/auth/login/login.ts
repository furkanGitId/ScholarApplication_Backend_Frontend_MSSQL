import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { AlertHelper } from '../../helpers/alert-helper';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,private router: Router,private alert: AlertHelper) { }

  onSubmit() {
    this.authService.login(this.formData).subscribe({
      next: (res) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('fullName', res.fullName); 
        localStorage.setItem('email', res.email);
        this.alert.show(res.message, 'success');

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (err) => {
        if (err.status === 401 && err.error?.message) {
          this.alert.show(err.error.message, 'error');
        } else {
          this.alert.show('Login failed', 'error');
        }
      }
    });
  }
}
