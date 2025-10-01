import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule],
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent  implements OnInit {
  public cart$: Observable<any>;
  displayedColumns: string[] = ['product', 'quantity', 'price', 'subtotal', 'actions'];

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe();
  }
  removeProduct(productId: string) {
    console.log('Eliminar producto:', productId);
    // this.cartService.removeProductFromCart(productId).subscribe();
  }

  updateQuantity(productId: string, newQuantity: number) {
    console.log(`Actualizar cantidad de ${productId} a ${newQuantity}`);
    // this.cartService.updateProductQuantity(productId, newQuantity).subscribe();
  }

}
