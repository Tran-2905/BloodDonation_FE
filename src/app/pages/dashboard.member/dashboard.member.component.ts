import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Route } from 'lucide-angular';

@Component({
  selector: 'app-dashboard.member',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './dashboard.member.component.html',
  styleUrl: './dashboard.member.component.scss'
})
export class DashboardMemberComponent {
  totalDonations = 8;
  livesImpacted = 24;
  lastDonation = "2 months ago";
  bloodType = "A+";
  eligibleToDonate = true;
  eligibleDate = "September 15, 2023";

  appointments = [
    { date: 'June 15, 2023', time: '10:30 AM', type: 'Whole Blood', status: 'Upcoming' },
  ];

  donationHistory = [
    { date: 'May 15, 2023', type: 'Whole Blood', location: 'Central Medical Center', units: 1, status: 'Completed' },
    { date: 'January 10, 2023', type: 'Plasma', location: 'Community Blood Drive', units: 1, status: 'Completed' },
    { date: 'September 5, 2022', type: 'Platelets', location: 'Central Medical Center', units: 1, status: 'Completed' },
  ];
}
