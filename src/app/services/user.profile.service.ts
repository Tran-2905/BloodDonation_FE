import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserProfile } from "../responses/user.profile.response";

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    constructor(private http: HttpClient) { }
    BaseUrl: string = "http://localhost:8080/api/v1/user-profile";

    fetchUserProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.BaseUrl}/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}