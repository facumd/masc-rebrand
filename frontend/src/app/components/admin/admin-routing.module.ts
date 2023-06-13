import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductComponent } from './create-product/create-product.component';
import { AdminGuard } from 'src/app/guard/admin-auth-guard.guard';

const routes: Routes = [
  {
    path: 'admin/create-product',
    component: CreateProductComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
