import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register.blog',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.blog.component.html',
  styleUrls: ['./register.blog.component.scss']
})
export class RegisterBlogComponent {
  post: any = {
    tittle: '',
    summary: '',
    content: '',
    image_url: '',
    author_name: '',
    designation: '',
    bio: '',
    avatar_url: ''
  };

  // Xử lý upload file, demo dùng local URL, thực tế bạn nên upload lên server và lấy URL trả về
  onFileChange(event: any, field: 'image_url' | 'avatar_url') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.post[field] = e.target.result; // Gán URL local để preview
        // Nếu upload lên server, gọi API ở đây và lấy URL trả về để gán vào this.post[field]
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Xử lý submit, gửi this.post lên API
    console.log(this.post);
    // Nếu cần upload file thực tế, hãy upload lên server và lấy URL trả về để gán vào image_url/avatar_url
  }
}
