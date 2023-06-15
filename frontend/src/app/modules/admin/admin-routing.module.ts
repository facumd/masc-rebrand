import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductComponent } from './create-product/create-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

import { AdminGuard } from 'src/app/guards/admin-auth.guard';

const routes: Routes = [
  {
    path: 'admin/create-product',
    component: CreateProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/delete-product',
    component: DeleteProductComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
