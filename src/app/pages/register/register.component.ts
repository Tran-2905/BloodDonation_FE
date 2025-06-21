import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BloodService } from '../../services/blood-service';
import { BloodType } from '../../models/blood.type';
import { User } from '../../models/user';
import { registerDto } from '../../dtos/register.dto';
import { userService } from '../../services/user-service';
import { instanceToPlain } from 'class-transformer';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  bloodTypes: BloodType[] = [];
  constructor(private router: Router, private _userService: userService, private _bloodService: BloodService, private fb: FormBuilder) { }


  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('retypePassword')?.value ? null : { mismatch: true };
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Assuming a 10-digit phone number
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      retypePassword: ['', Validators.required],
      bloodTypeId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
    this.fetchAllBloodTypes();

  }

  fetchAllBloodTypes() {
    this._bloodService.fetchAllBloodTypes().subscribe(
      (response: BloodType[]) => {
        this.bloodTypes = response;
        console.log('Blood Types:', this.bloodTypes);
      },
      (error) => {
        console.error('Error fetching blood types:', error);
      }
    );
  }

  onSubmit(registerForm: FormGroup) {
    if (registerForm.invalid) {
      this.markFormGroupTouched(registerForm);
      console.log('🧪 Form Submitted', registerForm.value, registerForm.valid);
      console.log('🧪 Form Errors', registerForm.errors);
      return;  // If the form is invalid, return
    }
    const user = new registerDto(
      registerForm.value.firstName,
      registerForm.value.lastName,
      registerForm.value.email,
      registerForm.value.phoneNumber,
      registerForm.value.password,
      'User', // Assuming role is 'user' for registration
      registerForm.value.country,
      registerForm.value.city,
      registerForm.value.address,
      registerForm.value.bloodTypeId,
      registerForm.value.dateOfBirth
    );
    const payload = instanceToPlain(user);
    console.log('Register Payload:', payload);
    this._userService.register(payload).subscribe({
      next: response => {
        console.log('✅ Registration successful:', response);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('❌ Registration failed:', error);
      },
      complete: () => {
        console.log('✅ Request completed');
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

}
