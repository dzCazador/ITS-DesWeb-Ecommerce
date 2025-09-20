import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any = { products: [] };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getUserCart().subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (err) => {
        console.error('Error al obtener el carrito', err);
      }
    });
  }

  finalizePurchase(): void {
    this.cartService.finalizeCart().subscribe({
      next: () => {
        alert('Compra finalizada con éxito.');
        this.loadCart();
      },
      error: (err) => {
        console.error('Error al finalizar la compra', err);
      }
    });
  }
}
