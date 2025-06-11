import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserLogin } from "../models/userLogin";

@Injectable({
    providedIn: 'root'
})


export class userService {

    constructor(private _httpClient: HttpClient) {
    }
    baseUrl: string = "http://localhost:8080/api/v1/login";

    // fetchAllUsers(): Observable<UserLogin[]> {
    //     return this._httpClient.get<UserLogin[]>(`${this.baseUrl}`);
    // }

    login(userLogin: UserLogin): Observable<any> {
        return this._httpClient.post<any>(`${this.baseUrl}`, userLogin);
    }
}