import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BlogPost } from "../models/blog.post";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient) { }
    baseUrl: string = "http://localhost:8080/api/v1/posts";
    requestPost(request: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/add`, request);
    }
    fetchAllPost(): Observable<BlogPost[]> {
        return this.http.get<BlogPost[]>(`${this.baseUrl}/all`);
    }
}