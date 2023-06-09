import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './pages/product/product.component';
import { ProductRoutingModule } from './store-routing.module';
import { StoreComponent } from './pages/store/store.component';

@NgModule({
  declarations: [ProductComponent, StoreComponent],
  exports: [ProductRoutingModule],
  imports: [CommonModule],
})
export class StoreModule {}
