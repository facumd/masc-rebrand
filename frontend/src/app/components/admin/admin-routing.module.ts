import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
  { path: 'admin/create-product', component: CreateProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
