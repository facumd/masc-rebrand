import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';
import { AuthResData } from '../../../../models/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  token: string = '';
  error: string = '';
  success: string = '';
  users = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [this.users.email, [Validators.required, Validators.email]],
      password: [
        this.users.password,
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (data: AuthResData) => {
        this.token = data?.token ?? '';
        console.log(data);
        this.router.navigate(['/']);
      },
      error: (errorRes) => {
        this.error = errorRes;
        console.log(errorRes);
      },
    });
    this.loginForm.reset();
  }
}
