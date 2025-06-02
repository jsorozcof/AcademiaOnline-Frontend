import { Injectable, signal } from '@angular/core';
import { User, UserSessionData } from './user.types';



@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
   private user: User | null = null;

  constructor() {
    this.loadFromSessionStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.sessionStorage;
  }

  private loadFromSessionStorage(): void {
    if (this.isBrowser()) {
      const data = sessionStorage.getItem('user');
      this.user = data ? JSON.parse(data) : null;
    } else {
      this.user = null;
    }
  }

  getUser(): User | null {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
    if (this.isBrowser()) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  clear(): void {
    this.user = null;
    if (this.isBrowser()) {
      sessionStorage.removeItem('user');
    }
  }

  /**
   *   private loadFromSessionStorage(): void {
    const stored = sessionStorage.getItem(this.sessionKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as UserSessionData;
        this._session.set(parsed);
      } catch (error) {
        console.error('Failed to parse session storage', error);
        this.clearSession();
      }
    }
  }
   */
}
