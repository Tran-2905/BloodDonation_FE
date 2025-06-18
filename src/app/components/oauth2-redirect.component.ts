// oauth2-redirect.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-oauth2-redirect',
    template: `<p>Đang xử lý đăng nhập...</p>`
})
export class Oauth2RedirectComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        window.addEventListener('message', (event) => {
            // Nếu bạn muốn bảo mật hơn, kiểm tra event.origin === 'http://localhost:8080'
            const data = event.data;

            if (data?.accessToken) {
                // Lưu token
                this.authService.saveToken(data.accessToken);
                this.authService.saveRefreshToken(data.refreshToken); // nếu cần

                // Optional: lưu user info
                this.authService.setUser(data.user);

                // Chuyển sang dashboard
                this.router.navigate(['home']);
            } else {
                console.error('Không nhận được access token từ backend');
            }
        });
    }
}