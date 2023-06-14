import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductComponent } from './create-product/create-product.component';
import { AdminGuard } from 'src/app/guard/admin-auth.guard';
import { DeleteProductComponent } from './delete-product/delete-product.component';

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
