import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppointmentModel } from "../responses/appointment";
@Injectable({
    providedIn: 'root'
})

export class AppointmentService {
    constructor(private http: HttpClient) { }
    baseUrl: string = "http://localhost:8080/api/v1/appointment";
    requestAppointment(request: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/add`, request);
    }

    getAllAppointments(): Observable<AppointmentModel> {
        return this.http.get<AppointmentModel>(`${this.baseUrl}/all`);
    }


}