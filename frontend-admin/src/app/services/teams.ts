import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamMembersService {
  private apiUrl = 'http://localhost:5000/api/TeamMembers';

  constructor(private http: HttpClient) { }

  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(this.apiUrl);
  }

  getTeamMemberById(id: number): Observable<TeamMember> {
    return this.http.get<TeamMember>(`${this.apiUrl}/${id}`);
  }

  addTeamMember(data: TeamMember): Observable<TeamMember> {
    return this.http.post<TeamMember>(this.apiUrl, data);
  }

  updateTeamMember(id: number, data: TeamMember): Observable<TeamMember> {
    return this.http.put<TeamMember>(`${this.apiUrl}/${id}`, data);
  }

  deleteTeamMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
