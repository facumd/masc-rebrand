import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuthenticated: boolean = true;

  isDarkMode = false;

  constructor(private themeService: ThemeService) {
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
}
