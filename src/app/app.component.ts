import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'My Microsoft Login - Example';

  constructor(private auth: AuthService) {}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  async login() {
    try {
      await this.auth.loginPopup();
    } catch (e) {
      console.error('Login failed', e);
    }
  }

  async logout() {
    try {
      await this.auth.logout();
    } catch (e) {
      console.error('Logout failed', e);
    }
  }
}
