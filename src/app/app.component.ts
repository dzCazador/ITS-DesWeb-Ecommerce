import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/invoices">Facturas</a></li>
        <li><a routerLink="/products">Productos</a></li>
        <li><a routerLink="/cart">Carrito</a></li>
        <li><a routerLink="/auth/login">Login</a></li>
        <li><a routerLink="/auth/register">Registro</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'its-desweb-ecommerce-app';
}
