import { Component, signal, HostListener, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private platformId = inject(PLATFORM_ID);
  protected readonly menuOpen = signal(false);
  protected readonly avatarOpen = signal(false);
  protected readonly hidden = signal(false);

  private lastScrollY = 0;
  private readonly threshold = 80;

  protected readonly links = [
    { path: '/', label: 'Inicio' },
    { path: '/pilars', label: 'Qué Hacemos' },
    { path: '/sucursal-virtual', label: 'Mi Cuenta' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/energia-solar', label: 'Energía Solar' },
    { path: '/capacitacion', label: 'Capacitación' },
    { path: '/blog', label: 'Novedades' },
    { path: '/reclamos', label: 'Reclamos' },
    { path: '/participacion', label: 'Tu Barrio Decide' },
  ];

  constructor(protected auth: AuthService) {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
      this.hidden.set(false);
    } else if (currentScroll > this.lastScrollY && currentScroll > this.threshold) {
      this.hidden.set(true);
    } else if (currentScroll < this.lastScrollY) {
      this.hidden.set(false);
    }
    this.lastScrollY = currentScroll;
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleAvatar(): void {
    this.avatarOpen.update(v => !v);
  }

  closeAvatar(): void {
    this.avatarOpen.set(false);
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.avatarOpen.set(false);
  }
}
