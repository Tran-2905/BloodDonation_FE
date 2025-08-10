import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { CloudSnow } from 'lucide-angular';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-register-blog',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.blog.component.html',
  styleUrls: ['./register.blog.component.scss']
})

export class RegisterBlogComponent {
  constructor(private postService: PostService, private router: Router, private categoryService: CategoryService) { };
  post: any = {
    tittle: '',
    summary: '',
    content: '',
    author_name: '',
    designation: '',
    bio: '',
    category_id: ''
  };


  imageFile: File | null = null;
  avatarFile: File | null = null;
  imagePreview: string | null = null;
  avatarPreview: string | null = null;
  categories: any[] = [];
  // Xử lý upload file, demo dùng local URL, thực tế bạn nên upload lên server và lấy URL trả về
  // onFileChange(event: any, field: 'image_url' | 'avatar_url') {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.post[field] = e.target.result; // Gán URL local để preview
  //       // Nếu upload lên server, gọi API ở đây và lấy URL trả về để gán vào this.post[field]
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onFileChange(event: any, field: 'image_url' | 'avatar_url') {
    const file = event.target.files[0];
    if (file) {
      if (field === 'image_url') {
        this.imageFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagePreview = e.target.result;
        reader.readAsDataURL(file);
      } else if (field === 'avatar_url') {
        this.avatarFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => this.avatarPreview = e.target.result;
        reader.readAsDataURL(file);
      }
    }
  }



  getAllCategories() {
    this.categoryService.fetchAllCategories().subscribe({
      next: data => {
        this.categories = data;
      },
      error: error => {
        this.handleError(error);
      }
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    this.post.category_id = selectedCategoryId;
  }

  ngOnInit() {
    this.getAllCategories();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(this.post)], { type: 'application/json' }));
    if (this.imageFile) {
      formData.append('image_url', this.imageFile);
    }
    if (this.avatarFile) {
      formData.append('avatar_url', this.avatarFile);
    }
    this.postService.requestPost(formData).subscribe({
      next: data => {
        console.log("add post success");
        this.router.navigate([''])
      },
      error: error => {
        this.handleError(error);
      },
      complete: () => {
        console.log('complete')
      }
    });
  }

  handleError(error: any) {
    if (error.status === 415) {
      alert('Lỗi: Định dạng dữ liệu không được hỗ trợ (Unsupported Media Type). Vui lòng kiểm tra lại dữ liệu gửi lên!');
    } else {
      alert('Đã xảy ra lỗi: ' + (error?.message || 'Không xác định'));
    }
    console.error('HttpErrorResponse', error);
  }
}
