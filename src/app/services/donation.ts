import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DonationResponse } from "../responses/donation.response";

@Injectable({
    providedIn: 'root'
})
export class DonationService {
    // Service methods and properties go here
    baseUrl: string = "http://localhost:8080/api/v1/donation";
    constructor(private http: HttpClient) { }
    getAllDonationFromUser(): Observable<DonationResponse[]> {
        return this.http.get<DonationResponse[]>(`${this.baseUrl}/all`);
    }
}