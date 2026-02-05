import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:5000/api/Services';

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
