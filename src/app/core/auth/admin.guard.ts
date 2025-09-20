import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { decode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = decode(token);
      if (decoded.role === 'admin') {
        return true;
      }
    }
    this.router.navigate(['/login']); // Redirige si no es admin
    return false;
  }
}
