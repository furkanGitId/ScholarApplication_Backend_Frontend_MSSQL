import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AboutUsAccordion {
  id: number;
  accordionKey: string;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private apiUrl = 'http://localhost:5000/api/AboutUsAccordions';

  constructor(private http: HttpClient) { }

  // Get all accordion items
  getAccordions(): Observable<AboutUsAccordion[]> {
    return this.http.get<AboutUsAccordion[]>(`${this.apiUrl}`);
  }

  // Get accordion by id (optional but useful)
  getAccordionById(id: number): Observable<AboutUsAccordion> {
    return this.http.get<AboutUsAccordion>(`${this.apiUrl}/${id}`);
  }

  // Add new accordion
  addAccordion(data: AboutUsAccordion): Observable<AboutUsAccordion> {
    return this.http.post<AboutUsAccordion>(`${this.apiUrl}`, data);
  }

  // Update existing accordion
  updateAccordion(id: number, data: AboutUsAccordion): Observable<AboutUsAccordion> {
    return this.http.put<AboutUsAccordion>(`${this.apiUrl}/${id}`, data);
  }

  // Delete accordion
  deleteAccordion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
