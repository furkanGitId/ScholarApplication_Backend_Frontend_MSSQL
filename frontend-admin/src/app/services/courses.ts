import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  image: string;
  category: string;
  categoryClass: string;
  title: string;
  author: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = 'http://localhost:5000/api/Courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  addCourse(data: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, data);
  }

  updateCourse(id: number, data: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, data);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
