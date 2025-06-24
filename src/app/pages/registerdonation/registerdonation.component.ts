import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DonationRegistration } from '../../models/donation.registration';
import { Gender } from '../../models/enum';
import { instanceToPlain } from 'class-transformer';
import { RequestDonationService } from '../../services/requestdonation.service';
import { BloodService } from '../../services/blood-service';
import { BloodTypeResponse } from '../../responses/blood.response';

@Component({
  selector: 'app-registerdonation',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registerdonation.component.html',
  styleUrl: './registerdonation.component.scss'
})
export class RegisterDonationComponent implements OnInit {

  constructor(private requestDonationService: RequestDonationService, private router: Router, private _bloodService: BloodService) { };

  bloodTypes: BloodTypeResponse[] = [];

  @ViewChild('donationForm') donationForm: any;
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  fullName: string = '';
  phone: string = '';
  email: string = '';
  birthDate: Date | undefined = undefined;
  gender: string = '';
  bloodTypeId: number = 0;
  weight: number | null = null;
  height: number | null = null;
  lastDonation: Date | undefined = undefined;
  preferredDate: Date | undefined = undefined;
  preferredTime: string = '';
  notes: string = '';
  agreeTerms: boolean = false;
  agreeContact: boolean = false;

  ngOnInit(): void {
    this.fetchAllBloodTypes();
  }
  cities = [
    'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Biên Hòa', 'Huế', 'Nha Trang', 'Buôn Ma Thuột',
    'Vinh', 'Cần Thơ', 'Rạch Giá', 'Quy Nhon', 'Vũng Tàu', 'Nam Định', 'Phan Thiết', 'Long Xuyên'
  ];

  fetchAllBloodTypes() {
    this._bloodService.fetchAllBloodTypes().subscribe(
      (response: BloodTypeResponse[]) => {
        this.bloodTypes = response;
        console.log('Blood Types:', this.bloodTypes);
      },
      (error) => {
        console.error('Error fetching blood types:', error);
      }
    );
  }

  healthQuestions = [
    { id: 1, question: 'Bạn có cảm thấy khỏe mạnh trong 7 ngày qua không?' },
    { id: 2, question: 'Bạn có đang dùng thuốc điều trị bệnh mãn tính không?' },
    { id: 3, question: 'Bạn có từng bị các bệnh truyền nhiễm qua đường máu không?' },
    { id: 4, question: 'Bạn có uống rượu bia trong 24 giờ qua không?' },
    { id: 5, question: 'Bạn có đang mang thai hoặc cho con bú không?' }
  ];


  onSubmit(donationForm: NgForm) {
    if (donationForm.invalid) {
      return;  // If the form is invalid, return
    }
    // Process the donation data here
    const donationRegistration = new DonationRegistration({
      fullName: this.fullName,
      phoneNumber: this.phone,
      email: this.email,
      dateOfBirth: this.birthDate,
      gender: this.gender as Gender,
      // bloodTypeId: this.bloodTypeId === null ? undefined : this.bloodTypeId,
      bloodTypeId: this.bloodTypeId,
      weight: this.weight,
      height: this.height,
      lastDonation: this.lastDonation,
      availableDate: this.preferredDate,
      availableTime: this.preferredTime,
      notes: this.notes,
      acceptGeneralTerm: this.agreeTerms,
      acceptContactTerm: this.agreeContact
    });

    const payload = instanceToPlain(donationRegistration);

    this.requestDonationService.requestDonation(payload).subscribe(
      response => {
        console.log("successful:", response)
        this.router.navigate(['home'])
      },
      error => {
        console.log("send error: ", error)
      }
    );
  }
}