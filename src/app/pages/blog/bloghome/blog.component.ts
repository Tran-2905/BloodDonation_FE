import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryDto } from '../../../dtos/blog.categories.dto';

@Component({
  selector: 'app-blog',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  constructor(private _categoryService: CategoryService) { }
  searchTerm = '';
  categories: CategoryDto[] = [];
  category: { id: number; name: string } = { id: 0, name: '' };
  selectedCategory: number | null = null;
  ngOnInit() {
    this.fetchAllCategories();
  }
  fetchAllCategories() {
    this._categoryService.fetchAllCategories().subscribe({
      next: (data: CategoryDto[]) => {
        this.categories = data;
        if (this.categories.length && this.selectedCategory === null) {
          this.selectedCategory = this.categories[0].id;
          this.onCategorySelectorChange();
        }
      },
      error: (err) => {
        console.error('Error fetching categories :', err);
      }
    });
  }
  onCategorySelectorChange() {
    const selectedType = this.categories.find(t => t.id === this.selectedCategory);
    if (selectedType) {
      this._categoryService.fetchCategoryById(selectedType.id).subscribe({
        next: (data: CategoryDto) => {
          if (data && data.name && data.id) {
            this.category = {
              id: data.id,
              name: data.name
            };
          } else {
            this.category = { id: 0, name: '' };
          }
        },
        error: (err) => {
          console.error(err);
          this.category = { id: 0, name: '' };
        }
      });
    }
  }

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

  filterByCategory(categoryName: string, event: Event) {
    event.preventDefault();
    this.selectedCategory = this.categories.find(cat => cat.name === categoryName)?.id || null;
    this.onCategorySelectorChange();
  }
}
