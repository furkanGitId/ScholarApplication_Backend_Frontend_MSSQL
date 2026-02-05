import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = 'http://localhost:5000/api/TeamMembers';

  constructor(private http: HttpClient) { }

  getTeam() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
