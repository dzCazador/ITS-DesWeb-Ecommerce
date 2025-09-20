import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth';
import { LoginComponent } from './features';
import { RegisterComponent } from './features';
import { ProductListComponent } from './features';
import { ProductDetailComponent } from './features';
import { CartComponent } from './features';
import { InvoiceListComponent } from './features';
import { InvoiceDetailComponent } from './features';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'invoices', component: InvoiceListComponent, canActivate: [AuthGuard] },
  { path: 'invoices/:id', component: InvoiceDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
