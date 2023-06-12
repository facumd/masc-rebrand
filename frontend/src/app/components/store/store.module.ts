import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductRoutingModule } from './store-routing.module';
import { StoreComponent } from './pages/store/store.component';

@NgModule({
  declarations: [ProductListComponent, StoreComponent],
  exports: [ProductRoutingModule],
  imports: [CommonModule],
})
export class StoreModule {}
