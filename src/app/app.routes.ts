import { Routes } from '@angular/router';
import { RegistroEstudianteComponent } from './features/estudiantes/pages/registro-estudiante/registro-estudiante.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },

  {
    path: 'Alumnos', loadChildren: () => import('./features/estudiantes/estudiantes-routing.module').then(m => m.REGISTRO_ESTUDIANTE_ROUTES)
  },
  {
    path: '',
    redirectTo: '/Alumnos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/Alumnos'
  }
];
