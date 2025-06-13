import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})


export class userService {

    constructor(private _httpClient: HttpClient) {
    }
    baseUrl: string = "http://localhost:8080/api/v1/user";

    // fetchAllUsers(): Observable<UserLogin[]> {
    //     return this._httpClient.get<UserLogin[]>(`${this.baseUrl}`);
    // }

    login(userLogin: any): Observable<any> {
        return this._httpClient.post<any>(`${this.baseUrl}/login`, userLogin);
    }
    register(userRegister: any): Observable<any> {
        return this._httpClient.post<any>(`${this.baseUrl}/register`, userRegister);
    }
}