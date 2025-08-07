import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  searchTerm = '';

  categories = ['Tất cả', 'Kiến thức', 'Câu chuyện', 'Sự kiện'];
  blogPosts = [
    {
      id: 1,
      title: 'Lợi ích sức khỏe khi hiến máu định kỳ',
      author: 'Nguyễn Văn A',
      date: '20/06/2025',
      image: 'assets/blog1.jpg',
      summary: 'Hiến máu không chỉ cứu người mà còn giúp bạn kiểm tra sức khỏe định kỳ, giảm nguy cơ bệnh tim mạch...'
    },
    {
      id: 2,
      title: 'Câu chuyện cảm động từ người nhận máu',
      author: 'Trần Thị B',
      date: '18/06/2025',
      image: 'assets/blog2.jpg',
      summary: 'Một giọt máu cho đi, một cuộc đời ở lại. Đọc câu chuyện về bé Minh được cứu sống nhờ cộng đồng hiến máu...'
    },
  ];
  featuredPosts = [
    { id: 1, title: 'Lợi ích sức khỏe khi hiến máu định kỳ' },
    { id: 2, title: 'Câu chuyện cảm động từ người nhận máu' }
  ];

  filterByCategory(cat: string) {
  }
}
