import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registerdonation',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registerdonation.component.html',
  styleUrl: './registerdonation.component.scss'
})
export class RegisterDonationComponent {

  @ViewChild('donationForm') donationForm: any;
  minDate = new Date().toISOString().split('T')[0];

  cities = [
    'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Biên Hòa', 'Huế', 'Nha Trang', 'Buôn Ma Thuột',
    'Vinh', 'Cần Thơ', 'Rạch Giá', 'Quy Nhon', 'Vũng Tàu', 'Nam Định', 'Phan Thiết', 'Long Xuyên'
  ];

  donationCenters = [
    { id: 1, name: 'Viện Huyết học - Truyền máu TW', address: 'Hà Nội' },
    { id: 2, name: 'Trung tâm Truyền máu - Huyết học TPHCM', address: 'TPHCM' },
    { id: 3, name: 'Bệnh viện Trung ương Huế', address: 'Huế' },
    { id: 4, name: 'Bệnh viện Đa khoa Đà Nẵng', address: 'Đà Nẵng' }
  ];

  healthQuestions = [
    { id: 1, question: 'Bạn có cảm thấy khỏe mạnh trong 7 ngày qua không?' },
    { id: 2, question: 'Bạn có đang dùng thuốc điều trị bệnh mãn tính không?' },
    { id: 3, question: 'Bạn có từng bị các bệnh truyền nhiễm qua đường máu không?' },
    { id: 4, question: 'Bạn có uống rượu bia trong 24 giờ qua không?' },
    { id: 5, question: 'Bạn có đang mang thai hoặc cho con bú không?' }
  ];

  donationData = {
    fullName: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: '',
    bloodType: '',
    city: '',
    district: '',
    address: '',
    weight: null,
    height: null,
    lastDonation: '',
    preferredDate: '',
    preferredTime: '',
    donationCenter: '',
    notes: '',
    healthAnswers: {} as any,
    agreeTerms: false,
    agreeContact: false
  };

  onSubmit() {
    console.log('Donation registration data:', this.donationData);
    // Implement API call to register donation
    // Example:
    // this.donationService.registerDonation(this.donationData).subscribe(...)
  }

}
