import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/common/environment'; // <-- Importa el archivo


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Retrieves the current user's cart.
   * Requires authentication.
   * @returns Observable<any> - The current user's cart.
   */
  getUserCart(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.apiUrl}/me`, { headers });
  }

  /**
   * Agrega un producto al carrito del usuario actual.
   * Requiere autenticación previa.
   * @param product - El producto a agregar al carrito.
   * @returns Observable<any> - La respuesta del servidor.
   */
  addProductToCart(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<any>(`${this.apiUrl}/me/add`, product, { headers });
  }

  /**
   * Remueve un producto del carrito del usuario actual.
   * Requiere autenticación previa.
   * @param product - El producto a remover del carrito.
   * @returns Observable<any> - La respuesta del servidor.
   */
  removeProductFromCart(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    // Para las solicitudes DELETE con cuerpo, se debe usar la propiedad 'body' en las opciones de la petición.
    return this.http.delete<any>(`${this.apiUrl}/me/remove`, { body: product, headers });
  }

  /**
   * Finaliza la compra actual del usuario.
   * Requiere autenticación previa.
   * @returns Observable<any> - La respuesta del servidor.
   */
  finalizeCart(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<any>(`${this.apiUrl}/me/finalize`, {}, { headers });
  }
}
