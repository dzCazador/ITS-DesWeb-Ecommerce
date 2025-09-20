import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/common/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = `${environment.apiUrl}/invoice`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMyInvoices(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }

  getInvoiceById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
