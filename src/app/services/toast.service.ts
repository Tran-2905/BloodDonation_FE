import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor() { }

    showToast({ error, defaultMsg: defaultMessage, title = '', delay = 5000 }: {
        error?: any,
        defaultMsg: string,
        title?: string,
        delay?: number
    }) {
        // Xác định message, màu sắc, icon
        let message = defaultMessage;
        let toastClass = 'toast-success';
        let icon = '✅';

        if (error) {
            toastClass = 'toast-error';
            icon = '❌';
            if (error.error && error.error.message) {
                message = error.error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
        }

        // Tạo container nếu chưa có
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.style.position = 'fixed';
            toastContainer.style.top = '24px';
            toastContainer.style.right = '24px';
            toastContainer.style.zIndex = '9999';
            toastContainer.style.display = 'flex';
            toastContainer.style.flexDirection = 'column';
            toastContainer.style.alignItems = 'flex-end';
            document.body.appendChild(toastContainer);
        }

        // Tạo toast element
        const toast = document.createElement('div');
        toast.classList.add('custom-toast', toastClass);
        toast.style.minWidth = '320px';
        toast.style.marginBottom = '1rem';
        toast.style.borderRadius = '12px';
        toast.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
        toast.style.fontFamily = 'Inter, Roboto, Arial, sans-serif';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.style.transition = 'opacity 0.3s, transform 0.3s';

        // Nội dung toast
        toast.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px; padding: 16px 20px 10px 20px;">
            <span style="font-size: 1.6rem;">${icon}</span>
            <div>
              <div style="font-weight: 700; font-size: 1.08rem; margin-bottom: 2px;">${title}</div>
              <div style="font-size: 1rem; color: #222;">${message}</div>
            </div>
            <button type="button" class="close-btn" style="margin-left:auto; background: none; border: none; color: #888; font-size: 1.3rem; cursor: pointer;">&times;</button>
          </div>
        `;

        // Thêm vào container
        toastContainer.appendChild(toast);

        // Hiệu ứng hiện lên
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        // Tự động ẩn sau delay
        const timeoutId = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => toast.remove(), 300);
        }, delay);

        // Xử lý đóng manual
        toast.querySelector('.close-btn')?.addEventListener('click', () => {
            clearTimeout(timeoutId);
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => toast.remove(), 300);
        });
    }
}