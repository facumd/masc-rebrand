import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { StoreModule } from './components/store/store.module';
import { AdminModule } from './components/admin/admin.module';
import { AuthModule } from './components/auth/auth.module';
import { ProfileModule } from './components/profile/profile.module';

import { HomeRoutingModule } from './components/home/home-routing.moduke';
import { AdminRoutingModule } from './components/admin/admin-routing.module';
import { AuthRoutingModule } from './components/auth/auth-routing.module';
import { ProfileRoutingModule } from './components/profile/profile-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AuthRoutingModule,
    SharedModule,
    ProfileModule,
    HomeRoutingModule,
    AdminModule,
    AdminRoutingModule,
    ProfileRoutingModule,
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
