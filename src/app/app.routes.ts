import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    // La clave del lazy loading: carga el módulo solo cuando la ruta 'auth' es visitada
    loadChildren: () => import('./features/auth/auth-routing.module').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'products',
    // La clave del lazy loading: carga el módulo solo cuando la ruta 'products' es visitada
    loadChildren: () => import('./features/product/product-routing.module').then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'cart',
    // Carga el módulo de cart de forma perezosa
    loadChildren: () => import('./features/cart/cart-routing.module').then(m => m.CART_ROUTES),

  },
  {
    path: 'invoices',
    // Carga el módulo de facturas de forma perezosa
    loadChildren: () => import('./features/invoice/invoice-routing.module').then(m => m.INVOICE_ROUTES),

  },
  {
    path: '**',
    redirectTo: '/products'
  }
];
