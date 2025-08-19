import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Route } from 'lucide-angular';
import { AppointmentService } from '../../services/appointment.service.';
import { AppointmentModel } from '../../responses/appointment';
import { DonationService } from '../../services/donation';
import { DonationResponse } from '../../responses/donation.response';

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

  donations: DonationResponse[] = [
    {
      donationId: null,
      donorUserId: null,
      recipientUserId: null,
      requestType: null,
      requestId: null,
      bloodType: null,
      component: null,
      unitsDonated: null,
      donationDate: null,
      status: null,
      progress: null,
      notes: null
    },
  ];

  constructor(private appointmentService: AppointmentService, private donationService: DonationService) {
    this.loadAppointments();
    this.loadDonationHistory();
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
  loadDonationHistory(): void {
    this.donationService.getAllDonationFromUser().subscribe(
      (response) => {
        this.donations = response;
      },
      (error) => {
        console.error('Error fetching donation history:', error);
      }
    );
  }
}
