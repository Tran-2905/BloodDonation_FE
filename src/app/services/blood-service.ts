import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BloodTypeResponse } from "../responses/blood.response";

@Injectable({
    providedIn: 'root'
})
export class BloodService {
    constructor(private _httpClient: HttpClient) { }


    baseUrl: string = "http://localhost:8080/api/v1/blood";
    // Method to fetch all blood types
    fetchAllBloodTypes(): Observable<BloodTypeResponse[]> {
        return this._httpClient.get<BloodTypeResponse[]>(`${this.baseUrl}/types`);
    }
    // Method to fetch all blood donations
    fetchAllBloodDonations(): Observable<any[]> {
        return this._httpClient.get<any[]>(`${this.baseUrl}/donations`);
    }

    fetchAllBloodType(id: number): Observable<any[]> {
        return this._httpClient.get<any[]>(`${this.baseUrl}/blood-type/${id}`);
    }

    fetchAllBloodComponent(): Observable<any[]> {
        return this._httpClient.get<any[]>(`${this.baseUrl}/component-type`);
    }

    fetchAllBloodCapacity(bloodTypeId: number, componentId: number): Observable<any[]> {
        return this._httpClient.get<any[]>(`${this.baseUrl}/blood-types/${bloodTypeId}/components?bloodComponentId=${componentId}`);
    }

}