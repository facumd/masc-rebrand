import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './components/shared/shared.module';
import { StoreModule } from './components/store/store.module';
import { HomeRoutingModule } from './components/home/home-routing.moduke';
import { AuthRoutingModule } from './components/auth/auth-routing.module';
import { AuthModule } from './components/auth/auth.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    StoreModule,
    AuthModule,
    AuthRoutingModule,
    HomeRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
