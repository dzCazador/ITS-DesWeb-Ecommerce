import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  invoice: any;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceService.getInvoiceById(id).subscribe({
        next: (data) => {
          this.invoice = data;
        },
        error: (err) => {
          console.error('Error al obtener la factura', err);
        }
      });
    }
  }
}
