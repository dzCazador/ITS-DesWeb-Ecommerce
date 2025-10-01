import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { environment } from 'src/common/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;
  private cartSubject = new BehaviorSubject<any>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Retrieves the current user's cart.
   * Requires authentication.
   * @returns Observable<any> - The current user's cart.
   */
  getUserCart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
       tap(cart => {
        this.cartSubject.next(cart)
        //console.log('Carrito actual:', cart)
       })
    );
  }
/**
 * Clears the cart state by emitting null to the cart observable.
 * This is useful when logging out or when the cart data is no longer needed.
 * @example
 * this.cartService.clearCartState();
 */
  clearCartState(): void {
    this.cartSubject.next(null);
  }


  /**
   * Agrega un producto al carrito del usuario actual.
   * Requiere autenticación previa.
   * @param product - El producto a agregar al carrito.
   * @returns Observable<any> - La respuesta del servidor.
   */

   addProductToCart(productId: string, quantity: number = 1, price: number): Observable<any> {
    const endpoint = `${this.apiUrl}/me/add`;

    const body = {
      id: productId,
      quantity: +quantity,
      price: parseFloat(price.toString()),
    };

    return this.http.post<any>(endpoint, body).pipe(
         tap(updatedCart => this.cartSubject.next(updatedCart))
      )
  }


  /**
   * Remueve un producto del carrito del usuario actual.
   * Requiere autenticación previa.
   * @param product - El producto a remover del carrito.
   * @returns Observable<any> - La respuesta del servidor.
   */
  removeProductFromCart(product: any): Observable<any> {
    // Para las solicitudes DELETE con cuerpo, se debe usar la propiedad 'body' en las opciones de la petición.
    return this.http.delete<any>(`${this.apiUrl}/me/remove`, { body: product });
  }

  /**
   * Finaliza la compra actual del usuario.
   * Requiere autenticación previa.
   * @returns Observable<any> - La respuesta del servidor.
   */
  finalizeCart(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/me/finalize`, {});
  }
}
