import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { userService } from '../../services/user-service';
import { instanceToPlain } from 'class-transformer';
import { UserLogin } from '../../dtos/UserLogin';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  email: string = '';
  password: string = '';
  loginError: string | null = null;
  datasource = Observable<UserLogin>
  constructor(private _userService: userService, private router: Router, private authService: AuthService, private toastService: ToastService) { };

  ngOnInit(): void {
    // If any initialization is required, it can go here
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:8080') {
        console.warn('Blocked message from untrusted origin:', event.origin);
        return;
      }

      const data = event.data;
      if (data?.accessToken) {
        this.authService.saveToken(data.accessToken);
        this.authService.saveRefreshToken(data.refreshToken);
        this.authService.setUser(data.user);

        this.router.navigate(['']);
      } else {
        console.error('Không nhận được accessToken từ Google login');
      }
    });
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;  // If the form is invalid, return
    }

    const user = new UserLogin(this.email, this.password);

    const payload = instanceToPlain(user);

    // Call the loginUser method from the service
    this._userService.login(payload).subscribe(
      response => {
        if (!response || !response.token) {
          this.loginError = 'Login failed. Please check your credentials and try again.';
          return;
        }
        // Lưu token vào localStorage
        this.authService.saveToken(response.token);

        // Nếu có refreshToken, lưu luôn
        if (response.refreshToken) {
          this.authService.saveRefreshToken(response.refreshToken);
        }
        // Nếu có user, lưu luôn
        if (response.user) {
          this.authService.setUser(response.user);
        }
        console.log('Login successful:', response);
        this.toastService.showToast({
          defaultMsg: 'Đăng nhập thành công!',
          title: 'Thành công',
          delay: 4000
        });
        this.router.navigate(['']); // Navigate to the dashboard or another page on successful login
      },
      error => {
        console.log("Login failed", error);
        this.loginError = 'Login failed. Please check your credentials and try again.';
        this.toastService.showToast({
          error,
          defaultMsg: 'Đăng nhập thất bại!',
          title: 'Lỗi',
          delay: 4000
        });
      }
    );
  }

  loginWithGoogle() {
    const popup = window.open(
      'http://localhost:8080/oauth2/authorization/google',
      '_blank',
      'width=500,height=600'
    )
  }

  showPassword: boolean = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  private markFormGroupTouched(form: NgForm): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.controls[key];
      control.markAsTouched();
    });
  }

  // @ViewChild('loginForm') loginForm!: NgForm;
  // phoneNumber: string = '';
  // password: string = '';
  // loginError: string | null = null;
  // datasource = Observable<UserLogin>
  // constructor(private _userService: userService) { };

  // formData: UserLogin = {
  //   phoneNumber: '',
  //   password: '',
  // };

  // showPassword: boolean = false;
  // isLoading: boolean = false;



  // onSubmit(form: NgForm): void {
  //   if (form.valid) {
  //     this.isLoading = true;
  //     this.loginError = '';

  //     const userLogin: UserLogin = {
  //       phoneNumber: this.phoneNumber,
  //       password: this.password
  //     };
  //     // Simulate API call
  //     setTimeout(() => {
  //       // Mock authentication logic
  //       this._userService.login(userLogin).subscribe(
  //         response => {
  //           debugger
  //           console.log('Login successful:', response);
  //         },
  //         error => {
  //           debugger
  //           console.log("Login failed", error);
  //           this.loginError = 'Login failed. Please check your credentials and try again.';
  //         }
  //       );
  //       if (this.formData.phoneNumber && this.formData.password) {
  //         console.log('Login successful:', this.formData);
  //         // Handle successful login (redirect, store token, etc.)
  //         this.handleSuccessfulLogin();
  //       } else {
  //         this.loginError = 'Invalid phone number or password';
  //       }
  //       this.isLoading = false;
  //     }, 2000);
  //   } else {
  //     this.markFormGroupTouched(form);
  //   }
  // }

  // togglePasswordVisibility(): void {
  //   this.showPassword = !this.showPassword;
  // }

  // onForgotPassword(event: Event): void {
  //   event.preventDefault();
  //   // Handle forgot password logic
  //   console.log('Forgot password clicked');
  //   // You can navigate to forgot password page or show modal
  // }

  // private handleSuccessfulLogin(): void {
  //   // Handle successful login
  //   // For example: navigate to dashboard, store authentication token, etc.
  //   console.log('Redirecting to dashboard...');

  // }

  // private markFormGroupTouched(form: NgForm): void {
  //   Object.keys(form.controls).forEach(key => {
  //     const control = form.controls[key];
  //     control.markAsTouched();
  //   });
  // }

  // // Utility method for phone number formatting (optional)
  // formatPhoneNumber(value: string): string {
  //   // Remove all non-digit characters
  //   const cleaned = value.replace(/\D/g, '');

  //   // Format as (XXX) XXX-XXXX
  //   const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  //   if (match) {
  //     return `(${match[1]}) ${match[2]}-${match[3]}`;
  //   }

  //   return value;
  // }

  // // Method to handle phone number input formatting
  // onPhoneNumberInput(event: any): void {
  //   const input = event.target;
  //   const formatted = this.formatPhoneNumber(input.value);
  //   this.formData.phoneNumber = formatted;
  // }
}
