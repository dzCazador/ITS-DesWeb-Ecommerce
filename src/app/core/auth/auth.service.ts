import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/common/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

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
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
