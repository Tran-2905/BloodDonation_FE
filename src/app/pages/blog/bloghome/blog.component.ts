import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryDto } from '../../../dtos/blog.categories.dto';
import { blogDTO } from '../../../dtos/blog.dto';
import { FeaturedPost } from '../../../dtos/featurePost';

@Component({
  selector: 'app-blog',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  constructor(private _categoryService: CategoryService, private _postService: PostService) { }
  searchTerm = '';
  categories: CategoryDto[] = [];
  category: { id: number; name: string } = { id: 0, name: '' };
  selectedCategory: number | null = null;
  blogs: blogDTO[] = [];
  featuredPosts: FeaturedPost[] = [];

  ngOnInit() {
    this.fetchAllCategories();
    this.fetchAllPosts();
    this.fetchAllFeaturedPosts();
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
  fetchAllPosts() {
    this._postService.fetchAllPost().subscribe({
      next: (data: blogDTO[]) => {
        this.blogs = data;
        console.log('Fetched posts:', data);
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      }
    });
  }

  fetchAllFeaturedPosts() {
    this._postService.fetchFeaturedPosts().subscribe({
      next: (data: FeaturedPost[]) => {
        this.featuredPosts = data;
        console.log('Fetched featured posts:', data);
      },
      error: (err) => {
        console.error('Error fetching featured posts:', err);
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

  filterByCategory(categoryName: string, event: Event) {
    event.preventDefault();
    this.selectedCategory = this.categories.find(cat => cat.name === categoryName)?.id || null;
    this.onCategorySelectorChange();
  }


}
