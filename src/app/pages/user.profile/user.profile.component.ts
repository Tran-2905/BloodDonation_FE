import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user.profile',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './user.profile.component.html',
  styleUrl: './user.profile.component.scss'
})
export class UserProfileComponent {
  user = {
    fullName: 'John Doe',
    email: 'johndoe@email.com',
    bloodType: 'A+',
    lastDonation: 'June 15, 2023',
    memberSince: 'January 2023',
    phone: '0123 456 789',
    dob: '1990-05-13',
    address: '123 Main St, City',
    conditions: 'None',
    medications: 'None'
  };

}
