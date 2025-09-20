import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Lógica para cargar un producto si se está editando
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.isEditing) {
        // Lógica para actualizar un producto
      } else {
        // Lógica para crear un nuevo producto
      }
    }
  }
}
