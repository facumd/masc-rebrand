import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.themeService.initializeDarkMode();
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

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
      this.isAdmin = user?.is_admin ? true : false;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
