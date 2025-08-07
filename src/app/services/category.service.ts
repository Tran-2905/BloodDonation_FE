import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryDto } from "../dtos/blog.categories.dto";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private _httpClient: HttpClient) { }
    baseUrl: string = "http://localhost:8080/api/v1/post-category";
    fetchAllCategories(): Observable<CategoryDto[]> {
        return this._httpClient.get<CategoryDto[]>(`${this.baseUrl}/all`);
    }
    fetchCategoryById(id: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseUrl}/category-type/${id}`);
    }
}