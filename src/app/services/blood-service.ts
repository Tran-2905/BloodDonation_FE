import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BloodType } from "../models/bloodType";

@Injectable({
    providedIn: 'root'
})
export class BloodService {
    constructor(private _httpClient: HttpClient) { }


    baseUrl: string = "http://localhost:8080/api/v1/blood/types";
    // Method to fetch all blood types
    fetchAllBloodTypes(): Observable<BloodType[]> {
        return this._httpClient.get<BloodType[]>(`${this.baseUrl}`);
    }
    // Method to fetch all blood donations
    fetchAllBloodDonations(): Observable<any[]> {
        return this._httpClient.get<any[]>(`${this.baseUrl}/donations`);
    }
}