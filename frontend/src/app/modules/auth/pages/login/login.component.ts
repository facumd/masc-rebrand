import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';
import { AuthResData } from '../../../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  token: string = '';
  error: string = '';
  success: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (data: AuthResData) => {
        this.token = data?.token ?? '';
        this.router.navigate(['/']);
      },
      error: (errorRes) => {
        this.error = errorRes;
        alert(errorRes);
      },
    });
    this.loginForm.reset();
  }
}
