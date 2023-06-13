import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  private userSub!: Subscription;
  isDarkMode = false;
  itemsInCart: number = 0;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.themeService.initializeDarkMode();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
      this.isAdmin = user?.is_admin ? true : false;
    });
  }

  toggleDarkMode() {
    setTimeout(() => {
      const currentMode = this.themeService.isDarkMode();
      this.isDarkMode = !currentMode;
      if (this.isDarkMode) {
        this.themeService.enableDarkMode();
      } else {
        this.themeService.enableLightMode();
      }
    }, 100);
  }

  goToCreateProduct() {
    this.router.navigate(['/admin/create-product']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
