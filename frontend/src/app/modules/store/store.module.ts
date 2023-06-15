import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './store-routing.module';
import { StoreComponent } from './pages/store/store.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    StoreComponent,
    CartComponent,
  ],
  exports: [ProductRoutingModule],
  imports: [CommonModule],
})
export class StoreModule {}
