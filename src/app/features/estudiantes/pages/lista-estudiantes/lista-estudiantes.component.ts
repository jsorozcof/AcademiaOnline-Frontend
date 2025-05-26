import { Component, effect, signal } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { EstudianteProgramaResponse, EstudianteResponse } from '../../models/estudiante-response.model';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
@Component({
  selector: 'app-lista-estudiantes',
  standalone: true,
   imports: [CommonModule, NzTableModule, NzButtonModule],
  templateUrl: './lista-estudiantes.component.html',
  styleUrl: './lista-estudiantes.component.scss'
})
export class ListaEstudiantesComponent {

  estudiantes = signal<EstudianteResponse[]>([]);
  estudiantePrograma = signal<EstudianteProgramaResponse[]>([]);
  loading = signal(false);

  constructor(private _estudianteService: EstudianteService) {
    this.cargarEstudiantes();

    effect(() => {
      console.log('Estudiantes cargados:', this.estudiantes());
    });
  }
  cargarEstudiantes(): void {
    this.loading.set(true);
    this._estudianteService.getAll().subscribe({
      next: (data) => this.estudiantePrograma.set(data),
      error: (err) => console.error('Error cargando estudiantes', err),
      complete: () => this.loading.set(false)
    });
  }

  /**
   * eliminar(id: number) {
    this.estudianteService.deleteEstudiante(id).subscribe({
      next: () => this.cargarEstudiantes(),
      error: (err) => console.error('Error al eliminar', err)
    });
  }
   */
}
