import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog.detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.detail.component.html',
  styleUrl: './blog.detail.component.scss'
})
export class BlogDetailComponent {
  post: any;
  constructor(private route: ActivatedRoute) {
    // Dữ liệu mẫu, thực tế bạn nên fetch từ API hoặc service
    const blogPosts = [
      {
        id: 1,
        title: 'Lợi ích sức khỏe khi hiến máu định kỳ',
        author: 'Nguyễn Văn A',
        date: '20/06/2025',
        image: 'assets/blog1.jpg',
        content: `
          <p>Hiến máu định kỳ không chỉ cứu người mà còn giúp bạn kiểm tra sức khỏe thường xuyên, giảm nguy cơ mắc các bệnh tim mạch, tăng cường sản xuất máu mới...</p>
          <p>Bạn sẽ được kiểm tra huyết áp, xét nghiệm máu miễn phí mỗi lần hiến máu.</p>
        `
      },
      {
        id: 2,
        title: 'Câu chuyện cảm động từ người nhận máu',
        author: 'Trần Thị B',
        date: '18/06/2025',
        image: 'assets/blog2.jpg',
        content: `
          <p>Một giọt máu cho đi, một cuộc đời ở lại. Bé Minh đã được cứu sống nhờ cộng đồng hiến máu. Gia đình gửi lời cảm ơn sâu sắc tới các nhà hảo tâm...</p>
        `
      }
    ];
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.post = blogPosts.find(p => p.id === id);
  }
}
