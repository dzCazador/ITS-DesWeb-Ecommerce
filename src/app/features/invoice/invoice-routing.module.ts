import { Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';

export const INVOICE_ROUTES: Routes = [
  {
    path: '',
    component: InvoiceListComponent
  },
  {
    path: ':id',
    component: InvoiceDetailComponent
  }
];
