import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  private baseUrl = 'http://localhost:5008/api/ShortUrl/';
  constructor(private http: HttpClient) {}
  shortenUrl(requestData: ShortenUrlRequest): Observable<any> {
      return this.http.post<any>(this.baseUrl+'create', requestData); 
  }

  getOriginalUrl(shortUrl: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+'shortCode?shortCode='+shortUrl);
  }
}
interface ShortenUrlRequest {
  originalUrl: string;
  expirationDate: Date | null;
}
