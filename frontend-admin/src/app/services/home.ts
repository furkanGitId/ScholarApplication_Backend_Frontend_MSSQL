import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Statistics {
  totalService: number;
  totalCourse: number;
  totalBanner: number;
  totalTeamMember: number;
  totalEvent: number;
  totalUser: number;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private apiUrl = 'http://localhost:5000/api/Statistics/GetStatistics';
  private apigetUsersUrl = 'http://localhost:5000/api/Auth/getUsers';

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.apiUrl}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apigetUsersUrl}`);
  }
}
