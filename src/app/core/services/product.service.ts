import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/common/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieve all products.
   * @returns {Observable<any[]>} Array of product data.
   */
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  /**
   * Retrieve a product by id.
   * @param {number} id Product id.
   * @returns {Observable<any>} Product data.
   */
  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
