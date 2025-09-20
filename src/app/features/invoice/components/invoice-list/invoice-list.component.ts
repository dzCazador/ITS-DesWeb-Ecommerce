import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: any[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.getMyInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
      },
      error: (err) => {
        console.error('Error al obtener las facturas', err);
      }
    });
  }
}
