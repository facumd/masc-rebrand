import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreComponent } from './pages/store/store.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { AccessDeniedComponent } from '../shared/access-denied/access-denied.component';
import { CartComponent } from './pages/cart/cart.component';
import { SuccessfulCheckoutComponent } from '../shared/successful-checkout/successful-checkout.component';
import { CancelCheckoutComponent } from '../shared/cancel-checkout/cancel-checkout.component';
import { AdminGuard } from 'src/app/guard/admin-auth.guard';

const routes: Routes = [
  { path: 'product', component: StoreComponent },
  { path: 'product/:slug', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'success', component: SuccessfulCheckoutComponent },
  {
    path: 'cancel',
    component: CancelCheckoutComponent,
    // canActivate: [AdminGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
