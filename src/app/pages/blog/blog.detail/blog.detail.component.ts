import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { blogDTO } from '../../../dtos/blog.dto';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.detail.component.html',
  styleUrl: './blog.detail.component.scss'
})
export class BlogDetailComponent {
  blog: blogDTO | undefined;
  constructor(private route: ActivatedRoute, private _postService: PostService) { }
  fetchPostById() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._postService.fetchPostById(id).subscribe({
      next: (data: blogDTO) => {
        this.blog = data;
        console.log('Fetched posts:', data);
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      }
    });
  }
  ngOnInit() {
    this.fetchPostById();
  }
}

