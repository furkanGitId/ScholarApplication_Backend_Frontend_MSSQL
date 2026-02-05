import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getContactUsContent() {
    return this.http.get<any[]>(`${this.apiUrl}/ContactSectionContents`);
  }

  submitContactForm(formData: any) {
    return this.http.post(`${this.apiUrl}/ContactMessages`, formData);
  }
}
