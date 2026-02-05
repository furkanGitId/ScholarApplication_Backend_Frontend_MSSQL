import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Testimonial {
  id: number;
  message: string;
  name: string;
  role: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class TestimonialsService {
  private apiUrl = 'http://localhost:5000/api/Testimonials';

  constructor(private http: HttpClient) { }

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.apiUrl);
  }

  getTestimonialById(id: number): Observable<Testimonial> {
    return this.http.get<Testimonial>(`${this.apiUrl}/${id}`);
  }

  addTestimonial(data: Testimonial): Observable<Testimonial> {
    return this.http.post<Testimonial>(this.apiUrl, data);
  }

  updateTestimonial(id: number, data: Testimonial): Observable<Testimonial> {
    return this.http.put<Testimonial>(`${this.apiUrl}/${id}`, data);
  }

  deleteTestimonial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

