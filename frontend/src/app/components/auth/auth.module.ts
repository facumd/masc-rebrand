import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LogInComponent, SignUpComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
