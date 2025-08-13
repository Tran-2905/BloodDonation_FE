import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserProfileService } from '../../services/user.profile.service';
import { UserProfile } from '../../responses/user.profile.response';

@Component({
  selector: 'app-user.profile',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.scss'],
  standalone: true
})
export class UserProfileComponent implements OnInit {


  user: UserProfile = {
    fullName: '',
    email: '',
    bloodType: '',
    lastDonation: null,
    memberSince: null,
    phone: '',
    dob: '',
    address: '',
    conditions: null,
    medications: null
  };
  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userProfileService.fetchUserProfile().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

}
