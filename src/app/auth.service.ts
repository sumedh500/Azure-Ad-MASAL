import { Injectable } from '@angular/core';
import {
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo
} from '@azure/msal-browser';
import { msalConfig, loginRequest } from './auth-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private msalInstance: PublicClientApplication;

  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);

    // Handle redirect responses (even if you mostly use popup)
    this.msalInstance.handleRedirectPromise().then(result => {
      if (result && result.account) {
        this.msalInstance.setActiveAccount(result.account);
      } else {
        const currentAccounts = this.msalInstance.getAllAccounts();
        if (currentAccounts.length > 0 && !this.msalInstance.getActiveAccount()) {
          this.msalInstance.setActiveAccount(currentAccounts[0]);
        }
      }
    });
  }

  get instance(): PublicClientApplication {
    return this.msalInstance;
  }

  get activeAccount(): AccountInfo | null {
    return this.msalInstance.getActiveAccount();
  }

  isLoggedIn(): boolean {
    return this.activeAccount != null;
  }

  async loginPopup(): Promise<AuthenticationResult> {
    const result = await this.msalInstance.loginPopup(loginRequest);
    if (result && result.account) {
      this.msalInstance.setActiveAccount(result.account);
    }
    return result;
  }

  async logout(): Promise<void> {
    const account = this.msalInstance.getActiveAccount();
    await this.msalInstance.logoutPopup({
      account: account || undefined
    });
  }

  async getAccessToken(): Promise<string | null> {
    const account = this.msalInstance.getActiveAccount();
    if (!account) {
      return null;
    }

    try {
      const result = await this.msalInstance.acquireTokenSilent({
        ...loginRequest,
        account
      });
      return result.accessToken;
    } catch (e) {
      const result = await this.msalInstance.acquireTokenPopup(loginRequest);
      return result.accessToken;
    }
  }
}
