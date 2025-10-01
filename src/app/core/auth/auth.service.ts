import { tap,Observable,BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/common/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'jwt_token';

  private userSubject = new BehaviorSubject<any | null>(null);
  public user$ = this.userSubject.asObservable(); // Observable público
  public isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
      private http: HttpClient,
      private router: Router) {
    this.loadUserFromToken(); // Cargar usuario al iniciar el servicio
  }

  /**
   * Logs in a user with the given credentials.
   * If the login is successful, it stores the received JWT token in local storage.
   * @param credentials - An object with email and password properties.
   * @returns An observable that returns the response of the login request.
   */
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {

        if (response && response.access_token) {
          console.log('Login response:', response.access_token);
          localStorage.setItem(this.tokenKey, response.access_token);
          this.loadUserFromToken();
          this.isAuthenticated$.next(true);
        }
      })
    );
  }

/**
 * Removes the JWT token from local storage, effectively logging out the user.
 *
 * @memberof AuthService
 */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
    this.isAuthenticated$.next(false);
    this.router.navigate(['/']);
  }

/**
 * Retrieves the JWT token from local storage, if it exists.
 * @returns The JWT token if it exists, or null otherwise.
*/
  getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
  }

/**
 * Checks if there is a JWT token stored in local storage.
 * Returns true if a token exists, and false otherwise.
 * @returns {boolean} True if a token exists, false otherwise.
 */
  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }
  private loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      try {
          // 1. Split the token into its three parts.
          const tokenParts = token.split('.');

          // 2. A JWT must have exactly three parts.
          if (tokenParts.length !== 3) {
            throw new Error('Invalid JWT format.');
          }

          // 3. Select the payload, which is the second part (index 1).
          const payload = tokenParts[1];

          // 4. Decode the Base64 payload into a JSON string.
          const decodedPayload = atob(payload);

          // 5. Parse the JSON string into a usable JavaScript object.
          const user = JSON.parse(decodedPayload);

          // 6. Update the application's state with the user data.
          this.userSubject.next(user);
      } catch (e) {
        console.error("Error decodificando el token", e);
        this.userSubject.next(null);
      }
    }
  }

}
