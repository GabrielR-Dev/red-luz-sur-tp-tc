import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(c => c.Home),
  },
  {
    path: 'pilars',
    loadComponent: () => import('./features/pilars/pilars').then(c => c.Pilars),
  },
  {
    path: 'sucursal-virtual',
    loadComponent: () => import('./features/sucursal-virtual/mi-cuenta/mi-cuenta').then(c => c.MiCuenta),
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./features/nosotros/nosotros').then(c => c.Nosotros),
  },
  {
    path: 'energia-solar',
    loadComponent: () => import('./features/energia-solar/energia-solar').then(c => c.EnergiaSolar),
  },
  {
    path: 'capacitacion',
    loadComponent: () => import('./features/capacitacion/capacitacion').then(c => c.Capacitacion),
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog').then(c => c.Blog),
  },
  {
    path: 'participacion',
    loadComponent: () => import('./features/participacion/participacion').then(c => c.Participacion),
  },
  {
    path: 'reclamos',
    loadComponent: () => import('./features/reclamos/reclamos').then(c => c.Reclamos),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
