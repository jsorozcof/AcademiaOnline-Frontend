import { Component, effect, signal } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { EstudianteProgramaResponse, EstudianteResponse } from '../../models/estudiante-response.model';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdherirProgramaFormComponent } from '../../components/adherir-programa-form/adherir-programa-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-estudiantes',
  standalone: true,
  imports: [CommonModule,NzPopconfirmModule, NzTableModule, NzButtonModule,NzIconModule],

  templateUrl: './lista-estudiantes.component.html',
  styleUrl: './lista-estudiantes.component.scss'
})

export class ListaEstudiantesComponent {

  estudiantes = signal<EstudianteResponse[]>([]);
  estudiantePrograma = signal<EstudianteProgramaResponse[]>([]);
  dataLoaded = false;
  loading = signal(false);

  constructor(
    private _estudianteService: EstudianteService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) {
    this.cargarEstudiantes();

    effect(() => {
      console.log('Estudiantes cargados:', this.estudiantes());
    });
  }

  trackById(index: number, item: EstudianteProgramaResponse): number {
    return item.id;
  }
  confirmarEliminar(id: number) {
    // tu lógica para eliminar con confirmación
  }
  adherirAPrograma(estudiante: EstudianteProgramaResponse): void {
    console.log('Adherir estudiante:', estudiante);

  }
  cargarEstudiantes(): void {
    this.loading.set(true);
    this._estudianteService.getAll().subscribe({
      next: (data) => {
        this.dataLoaded = true;
        this.estudiantePrograma.set(data);
      },
      error: (err) => console.error('Error cargando estudiantes', err),
      complete: () => this.loading.set(false)
    });
  }


  editar(est: EstudianteProgramaResponse): void {
    console.log('Editar estudiante', est);
  }
  eliminar(id: number) {
    this._estudianteService.delete(id).subscribe({
      next: () => this.cargarEstudiantes(),
      error: (err) => console.error('Error al eliminar', err)
    });
  }

    abrirModalAdherir(estudiante: any): void {
    const form: FormGroup = this.fb.group({
      programaId: [null, Validators.required],
    });

    this.modal.create({
      nzTitle: `Adherir ${estudiante.nombre} a un Programa`,
      nzContent: AdherirProgramaFormComponent,
      nzData: {
        form,
        programas: this.estudiantePrograma(),
      },
       nzFooter: null,
       nzMaskClosable: false

    });
  }
}
