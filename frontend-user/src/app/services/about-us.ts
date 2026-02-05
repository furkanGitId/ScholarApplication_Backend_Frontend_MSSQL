import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private apiUrl = 'http://localhost:5000/api/AboutUsAccordions';

  constructor(private http: HttpClient) { }

  getAboutUs() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
