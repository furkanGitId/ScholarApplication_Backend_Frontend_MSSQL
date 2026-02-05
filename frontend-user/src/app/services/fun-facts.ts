import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FunFactsService {
  private apiUrl = 'http://localhost:5000/api/FunFacts';

  constructor(private http: HttpClient) { }

  getFunFacts() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
