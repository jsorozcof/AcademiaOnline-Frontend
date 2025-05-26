import { Routes } from '@angular/router';
import { RegistroEstudianteComponent } from '../estudiantes/pages/registro-estudiante/registro-estudiante.component';
import { ListaEstudiantesComponent } from '../estudiantes/pages/lista-estudiantes/lista-estudiantes.component';
//import { DetalleEstudianteComponent } from './estudiantes/pages/detalle-estudiante/detalle-estudiante.component';
//import { MateriasComponent } from './materias/pages/materias.component';

export const REGISTRO_ESTUDIANTE_ROUTES: Routes = [
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registro'
  },
  {
    path: 'registro',
    component: RegistroEstudianteComponent
  },
  {
    path: 'lista',
    component: ListaEstudiantesComponent
  },
];



