import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Route } from 'lucide-angular';
import { Appointment } from '../../services/requestdonation.service';
import { AppointmentModel } from '../../responses/appointment';

@Component({
  selector: 'app-dashboard.member',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './dashboard.member.component.html',
  styleUrl: './dashboard.member.component.scss'
})
export class DashboardMemberComponent implements OnInit {
  totalDonations = 8;
  livesImpacted = 24;
  lastDonation = "2 months ago";
  bloodType = "A+";
  eligibleToDonate = true;


  eligibleDate = "September 15, 2023";

  appointment: AppointmentModel =
    { date: '', status: '', time: '', type: '' };

  donationHistory = [
    { date: 'May 15, 2023', type: 'Whole Blood', location: 'Central Medical Center', units: 1, status: 'Completed' },
    { date: 'January 10, 2023', type: 'Plasma', location: 'Community Blood Drive', units: 1, status: 'Completed' },
    { date: 'September 5, 2022', type: 'Platelets', location: 'Central Medical Center', units: 1, status: 'Completed' },
  ];

  constructor(private appointmentService: Appointment) {
    this.loadAppointments();
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      (response) => {
        this.appointment = response;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
}
