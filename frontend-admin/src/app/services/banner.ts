import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface Banner {
  id: number;
  class: string;
  category: string;
  title: string;
  description: string;
  playText: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl = 'http://localhost:5000/api/Banners';

  constructor(private http: HttpClient) { }

  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl);
  }

  addBanner(banner: Banner): Observable<Banner> {
    return this.http.post<Banner>(this.apiUrl, banner);
  }

  updateBanner(id: number, banner: Banner): Observable<Banner> {
    return this.http.put<Banner>(`${this.apiUrl}/${id}`, banner);
  }
}
