import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { userService } from '../../services/user-service';
import { instanceToPlain } from 'class-transformer';
import { UserLogin } from '../../models/UserLogin';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '';
  password: string = '';
  loginError: string | null = null;
  datasource = Observable<UserLogin>
  constructor(private _userService: userService, private router: Router) { };

  ngOnInit(): void {
    // If any initialization is required, it can go here
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;  // If the form is invalid, return
    }

    const user = new UserLogin(this.phoneNumber, this.password);

    const payload = instanceToPlain(user);

    // Call the loginUser method from the service
    this._userService.login(payload).subscribe(
      response => {
        if (!response || !response.token) {
          this.loginError = 'Login failed. Please check your credentials and try again.';
          return;
        }
        console.log('Login successful:', response);
        this.router.navigate(['/']); // Navigate to the dashboard or another page on successful login
      },
      error => {
        console.log("Login failed", error);
        this.loginError = 'Login failed. Please check your credentials and try again.';
      }
    );
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
