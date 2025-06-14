import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    // Mock data methods - replace with actual API calls
    getStats() {
        return [
            { number: '15,420', label: 'Người hiến máu', icon: 'bi-people-fill' },
            { number: '45,680', label: 'Lần hiến máu', icon: 'bi-droplet-fill' },
            { number: '120+', label: 'Trung tâm y tế', icon: 'bi-hospital' },
            { number: '98%', label: 'Tỷ lệ hài lòng', icon: 'bi-heart-fill' }
        ];
    }

    getBenefits() {
        return [
            {
                title: 'Cứu sống mạng người',
                description: 'Mỗi lần hiến máu có thể cứu sống đến 3 người',
                icon: 'bi-heart-fill'
            },
            {
                title: 'Tốt cho sức khỏe',
                description: 'Giúp tái tạo tế bào máu mới và kiểm tra sức khỏe',
                icon: 'bi-shield-check'
            },
            {
                title: 'Giảm nguy cơ bệnh tim',
                description: 'Giảm lượng sắt dư thừa trong máu',
                icon: 'bi-heart-pulse'
            },
            {
                title: 'Cảm giác hạnh phúc',
                description: 'Mang lại niềm vui khi giúp đỡ người khác',
                icon: 'bi-emoji-smile'
            }
        ];
    }

    getDonationProcess() {
        return [
            {
                title: 'Đăng ký',
                description: 'Điền thông tin và đặt lịch hẹn online'
            },
            {
                title: 'Khám sàng lọc',
                description: 'Kiểm tra sức khỏe và xét nghiệm cơ bản'
            },
            {
                title: 'Hiến máu',
                description: 'Quá trình hiến máu an toàn kéo dài 8-10 phút'
            },
            {
                title: 'Nghỉ ngơi',
                description: 'Thư giãn và ăn nhẹ sau khi hiến máu'
            }
        ];
    }

    getRecentDonations() {
        return [
            { name: 'Nguyễn Văn An', bloodType: 'O+', date: '2 ngày trước', amount: 450 },
            { name: 'Trần Thị Bình', bloodType: 'A+', date: '3 ngày trước', amount: 450 },
            { name: 'Lê Văn Cường', bloodType: 'B-', date: '5 ngày trước', amount: 350 },
            { name: 'Phạm Thị Dung', bloodType: 'AB+', date: '1 tuần trước', amount: 450 },
            { name: 'Hoàng Văn Em', bloodType: 'O-', date: '1 tuần trước', amount: 450 },
            { name: 'Võ Thị Phượng', bloodType: 'A-', date: '2 tuần trước', amount: 350 }
        ];
    }

    getTestimonials() {
        return [
            {
                name: 'Nguyễn Minh Anh',
                role: 'Người hiến máu tình nguyện',
                content: 'Hiến máu không chỉ giúp đỡ người khác mà còn giúp tôi cảm thấy ý nghĩa hơn trong cuộc sống. Đây là việc làm tuyệt vời mà ai cũng nên thử.'
            },
            {
                name: 'Trần Văn Hùng',
                role: 'Bác sĩ tim mạch',
                content: 'Với tư cách là bác sĩ, tôi thấy rõ tầm quan trọng của việc hiến máu. Mỗi đơn vị máu hiến tặng đều có thể cứu sống một mạng người.'
            },
            {
                name: 'Lê Thị Mai',
                role: 'Người nhận máu',
                content: 'Tôi đã được cứu sống nhờ máu hiến tặng trong một ca phẫu thuật khẩn cấp. Tôi vô cùng biết ơn những người hiến máu tình nguyện.'
            }
        ];
    }

    // API methods for real implementation
    getStatsFromAPI(): Observable<any> {
        return this.http.get(`${this.apiUrl}/stats`);
    }

    getBenefitsFromAPI(): Observable<any> {
        return this.http.get(`${this.apiUrl}/benefits`);
    }

    getDonationProcessFromAPI(): Observable<any> {
        return this.http.get(`${this.apiUrl}/donation-process`);
    }

    getRecentDonationsFromAPI(): Observable<any> {
        return this.http.get(`${this.apiUrl}/donations/recent`);
    }

    getTestimonialsFromAPI(): Observable<any> {
        return this.http.get(`${this.apiUrl}/testimonials`);
    }

    // Blood type data
    getBloodTypes(): Observable<any> {
        return of([
            {
                type: 'O+',
                name: 'O Dương tính',
                description: 'Nhóm máu phổ biến nhất',
                percentage: 38,
                canGiveTo: ['O+', 'A+', 'B+', 'AB+'],
                canReceiveFrom: ['O+', 'O-']
            },
            {
                type: 'A+',
                name: 'A Dương tính',
                description: 'Nhóm máu phổ biến thứ hai',
                percentage: 34,
                canGiveTo: ['A+', 'AB+'],
                canReceiveFrom: ['A+', 'A-', 'O+', 'O-']
            },
            {
                type: 'B+',
                name: 'B Dương tính',
                description: 'Nhóm máu ít phổ biến',
                percentage: 9,
                canGiveTo: ['B+', 'AB+'],
                canReceiveFrom: ['B+', 'B-', 'O+', 'O-']
            },
            {
                type: 'AB+',
                name: 'AB Dương tính',
                description: 'Nhóm máu hiếm, người nhận vạn năng',
                percentage: 3,
                canGiveTo: ['AB+'],
                canReceiveFrom: ['Tất cả']
            },
            {
                type: 'O-',
                name: 'O Âm tính',
                description: 'Người hiến máu vạn năng',
                percentage: 7,
                canGiveTo: ['Tất cả'],
                canReceiveFrom: ['O-']
            },
            {
                type: 'A-',
                name: 'A Âm tính',
                description: 'Nhóm máu hiếm',
                percentage: 6,
                canGiveTo: ['A+', 'A-', 'AB+', 'AB-'],
                canReceiveFrom: ['A-', 'O-']
            },
            {
                type: 'B-',
                name: 'B Âm tính',
                description: 'Nhóm máu rất hiếm',
                percentage: 2,
                canGiveTo: ['B+', 'B-', 'AB+', 'AB-'],
                canReceiveFrom: ['B-', 'O-']
            },
            {
                type: 'AB-',
                name: 'AB Âm tính',
                description: 'Nhóm máu hiếm nhất',
                percentage: 1,
                canGiveTo: ['AB+', 'AB-'],
                canReceiveFrom: ['AB-', 'A-', 'B-', 'O-']
            }
        ]);
    }

    // Blog data
    getBlogPosts(): Observable<any> {
        return of([
            {
                id: 1,
                title: 'Tầm quan trọng của việc hiến máu trong thời đại dịch bệnh',
                excerpt: 'Trong bối cảnh dịch bệnh COVID-19, việc duy trì nguồn cung máu trở nên quan trọng hơn bao giờ hết.',
                content: 'Nội dung chi tiết bài viết...',
                author: 'BS. Nguyễn Thị Lan',
                authorAvatar: '',
                publishedAt: '2024-12-15',
                readTime: 8,
                category: 'Sức khỏe',
                tags: ['hiến máu', 'covid-19', 'sức khỏe'],
                featured: true,
                image: ''
            },
            {
                id: 2,
                title: 'Chuẩn bị trước khi hiến máu',
                excerpt: 'Những điều cần biết và chuẩn bị trước khi tham gia hiến máu tình nguyện.',
                content: 'Nội dung chi tiết bài viết...',
                author: 'ThS. Trần Văn Minh',
                authorAvatar: '',
                publishedAt: '2024-12-12',
                readTime: 5,
                category: 'Hướng dẫn',
                tags: ['hiến máu', 'chuẩn bị', 'hướng dẫn'],
                featured: false,
                image: ''
            }
        ]);
    }

    // Donation registration
    registerDonation(donationData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/donations/register`, donationData);
    }

    // User registration
    registerUser(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/register`, userData);
    }

    getBloodFacts() {
        return [
            {
                icon: 'bi-droplet-fill',
                title: 'Máu chiếm 7-8% trọng lượng cơ thể',
                description: 'Một người trưởng thành có khoảng 4,5-6 lít máu trong cơ thể.'
            },
            {
                icon: 'bi-heart-pulse',
                title: 'Máu mang oxy và dinh dưỡng',
                description: 'Máu vận chuyển oxy và chất dinh dưỡng đến các tế bào.'
            },
            {
                icon: 'bi-emoji-smile',
                title: 'Hiến máu giúp cứu sống người khác',
                description: 'Mỗi lần hiến máu có thể cứu sống đến 3 người.'
            }
        ];
    }

    getVietnamBloodStats() {
        return [
            { type: 'O', percentage: 42 },
            { type: 'A', percentage: 25 },
            { type: 'B', percentage: 27 },
            { type: 'AB', percentage: 6 }
        ];
    }

    getBloodTypes2(): Observable<any> {
        return of([
            { type: 'O-', name: 'O Âm tính' },
            { type: 'O+', name: 'O Dương tính' },
            { type: 'A-', name: 'A Âm tính' },
            { type: 'A+', name: 'A Dương tính' },
            { type: 'B-', name: 'B Âm tính' },
            { type: 'B+', name: 'B Dương tính' },
            { type: 'AB-', name: 'AB Âm tính' },
            { type: 'AB+', name: 'AB Dương tính' }
        ]);
    }

    getCompatibilityChart() {
        return [
            { type: 'O-', compatibility: [true, true, true, true, true, true, true, true] },
            { type: 'O+', compatibility: [false, true, false, true, false, true, false, true] },
            { type: 'A-', compatibility: [false, false, true, true, false, false, true, true] },
            { type: 'A+', compatibility: [false, false, false, true, false, false, false, true] },
            { type: 'B-', compatibility: [false, false, false, false, true, true, true, true] },
            { type: 'B+', compatibility: [false, false, false, false, false, true, false, true] },
            { type: 'AB-', compatibility: [false, false, false, false, false, false, true, true] },
            { type: 'AB+', compatibility: [false, false, false, false, false, false, false, true] }
        ];
    }
}