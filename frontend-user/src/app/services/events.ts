import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'http://localhost:5000/api/Events';

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
