import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:5000/api/Services';

  constructor(private http: HttpClient) { }

  // Get all services
  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}`);
  }

  // Add a new service
  addService(service: ServiceItem): Observable<ServiceItem> {
    return this.http.post<ServiceItem>(`${this.apiUrl}`, service);
  }

  // Update an existing service
  updateService(id: number, service: ServiceItem): Observable<ServiceItem> {
    return this.http.put<ServiceItem>(`${this.apiUrl}/${id}`, service);
  }

  // delete a service
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
