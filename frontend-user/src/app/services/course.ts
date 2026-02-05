import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:5000/api/Courses';

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<any[]>(this.apiUrl);
  }  
}
