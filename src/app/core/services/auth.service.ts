import { Injectable, signal, computed } from '@angular/core';
import { UserSession } from '../models/invoice.interface';
import { UserService } from './user.service';

const STORAGE_KEY = 'rls_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<UserSession | null>(null);

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly initials = computed(() => {
    const u = this._user();
    if (!u) return '';
    return (u.nombre[0] + u.apellido[0]).toUpperCase();
  });

  constructor(private userSvc: UserService) {
    this.restoreFromStorage();
  }

  login(dni: string, numeroCliente: string): boolean {
    const found = this.userSvc.findUser(dni, numeroCliente);
    if (!found) return false;
    this._user.set(found);
    this.saveToStorage();
    return true;
  }

  logout(): void {
    this._user.set(null);
    if (this.isBrowser()) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  updateUser(updated: UserSession): void {
    this._user.set(updated);
    this.saveToStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private saveToStorage(): void {
    if (!this.isBrowser()) return;
    const u = this._user();
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    }
  }

  private restoreFromStorage(): void {
    if (!this.isBrowser()) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const u = JSON.parse(raw) as UserSession;
        this._user.set(u);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
