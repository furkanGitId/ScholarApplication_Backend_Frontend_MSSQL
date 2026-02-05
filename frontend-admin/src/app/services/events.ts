import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EventItem {
  id: number;
  image: string;
  category: string;
  title: string;
  eventDate: string;
  durationHours: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'http://localhost:5000/api/Events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.apiUrl);
  }

  addEvent(data: EventItem): Observable<EventItem> {
    return this.http.post<EventItem>(this.apiUrl, data);
  }

  updateEvent(id: number, data: EventItem): Observable<EventItem> {
    return this.http.put<EventItem>(`${this.apiUrl}/${id}`, data);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
