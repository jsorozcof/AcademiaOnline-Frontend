import { Routes } from '@angular/router';
import { RegistroEstudianteComponent } from './features/estudiantes/pages/registro-estudiante/registro-estudiante.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },


  {
    path: 'registro',
    loadComponent: () => import('./features/auth/registro-estudiantes/registro-estudiantes.component').then(m => m.RegistroEstudiantesComponent)
  },

  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },

  {
    path: 'Alumnos', loadChildren: () => import('./features/estudiantes/estudiantes-routing.module').then(m => m.REGISTRO_ESTUDIANTE_ROUTES)
  },
   {
        path: 'lista',
        loadComponent: () =>
          import('./features/estudiantes/pages/lista-estudiantes/lista-estudiantes.component').then(
            m => m.ListaEstudiantesComponent
          ),
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
