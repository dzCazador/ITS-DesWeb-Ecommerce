import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';

// 1. Importa los módulos de Angular Material que necesitas
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './features';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { CartService } from 'src/app/core/services/cart.service';
import { AuthService } from 'src/app/core/auth/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule
     ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  public isAuthenticated$: Observable<boolean>;
  public user$: Observable<any | null>;
  private authSubscription!: Subscription;

  public cartItemCount$: Observable<number>;
  title = 'its-desweb-ecommerce-app';

  constructor(public dialog: MatDialog,
              private cartService: CartService,
              private authService: AuthService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.user$ = this.authService.user$;
    this.cartItemCount$ = this.cartService.cart$.pipe(
        map(cart => {
          if (!cart || !cart.products) {
            return 0;
          }
          return cart.products.reduce((acc: any, item: { quantity: any; }) => acc + item.quantity, 0);
        })
      );
  }
  ngOnInit(): void {
    // Si el usuario ya está autenticado al cargar el componente, obtenemos su carrito
    this.cartService.getUserCart().subscribe();
    this.authSubscription = this.authService.isAuthenticated$.pipe(
      filter(isAuthenticated => !isAuthenticated)
    ).subscribe(() => {
      console.log('Se detectó cierre de sesión, limpiando carrito...');
      this.cartService.clearCartState();
    });
  }
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


 openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.getUserCart().subscribe();
      }
    });
  }

  logout(): void {
    // Llama al servicio de autenticación para cerrar sesión
    this.authService.logout();
    // Limpia el estado del carrito
    this.cartService.clearCartState();
    // Redirige al usuario a la página de productos
  }
}
