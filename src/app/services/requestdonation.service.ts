import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class RequestDonationService {
    constructor(private http: HttpClient) { }
    baseUrl: string = "http://localhost:8080/api/v1/request-donation";
    requestDonation(request: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/add`, request);
    }

}