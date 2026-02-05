import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl = 'http://localhost:5000/api/Banners';

  constructor(private http: HttpClient) { }

  getBanners() {
    return this.http.get<any[]>(this.apiUrl);
  }

}
