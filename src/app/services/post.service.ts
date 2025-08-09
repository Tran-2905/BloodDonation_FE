import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { blogDTO } from "../dtos/blog.dto";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient) { }
    baseUrl: string = "http://localhost:8080/api/v1/posts";
    requestPost(request: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/add`, request);
    }
    fetchAllPost(): Observable<blogDTO[]> {
        return this.http.get<blogDTO[]>(`${this.baseUrl}/all`);
    }
    fetchPostById(id: number): Observable<blogDTO> {
        return this.http.get<blogDTO>(`${this.baseUrl}/${id}`);
    }
}