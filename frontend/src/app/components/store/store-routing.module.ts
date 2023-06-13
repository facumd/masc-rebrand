import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreComponent } from './pages/store/store.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { AccessDeniedComponent } from '../shared/access-denied/access-denied.component';

const routes: Routes = [
  { path: 'product', component: StoreComponent },
  { path: 'product/:slug', component: ProductDetailComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
