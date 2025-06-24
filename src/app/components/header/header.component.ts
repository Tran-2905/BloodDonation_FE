import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showDropdown = false;
  showNotifications = false;
  notifications = ['Bạn có lịch hiến máu ngày 25/6', 'Cảm ơn bạn đã đăng ký!'];
  notificationCount = this.notifications.length;
  user: any;

  constructor(public authService: AuthService) {
    this.user = this.authService.getUser();
  }

  get userInitial() {
    return this.user?.name ? this.user.name.charAt(0).toUpperCase() : 'U';
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    this.showNotifications = false;
  }
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showDropdown = false;
  }
}
