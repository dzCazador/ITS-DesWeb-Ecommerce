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

  /**
   * Retrieves all invoices.
   * @returns {Observable<any[]>} Array of invoice data.
   */
  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  /**
   * Retrieves an invoice by id.
   * Requires authentication.
   * @param id The id of the invoice to retrieve.
   * @returns Observable<any> - The invoice data.
   */
  getInvoiceById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
