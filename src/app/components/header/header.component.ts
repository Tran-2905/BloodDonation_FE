import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
    this.showNotifications = false; // khi mở dropdown thì tắt thông báo
  }

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
    this.showDropdown = false; // khi mở thông báo thì tắt dropdown
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown')) {
      this.showDropdown = false;
    }
    if (!target.closest('.notification-bell')) {
      this.showNotifications = false;
    }
  }
}