import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importaciones de Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Importación de Servicios
import { ProductService } from 'src/app/core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Productos cargados:', this.products);
      },
      error: (err) => {
        console.error('Error al obtener los productos', err);
      }
    });
  }

  addToCart(product: any): void {
    // La llamada al servicio usa solo el ID del producto, como requiere el backend
    this.cartService.addProductToCart(product.id,1,product.price).subscribe({
      next: () => {
        console.log(`${product.name} fue agregado al carrito`);
        this.snackBar.open(`${product.name} fue agregado al carrito`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      error: (err) => {
        console.error('Error al agregar al carrito:', err);
        this.snackBar.open('No se pudo agregar el producto. Intenta de nuevo.', 'Cerrar', {
          duration: 4000
        });
      }
    });
  }
}
