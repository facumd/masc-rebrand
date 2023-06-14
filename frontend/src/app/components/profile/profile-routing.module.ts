import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from 'src/app/guard/user-auth.guard';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
