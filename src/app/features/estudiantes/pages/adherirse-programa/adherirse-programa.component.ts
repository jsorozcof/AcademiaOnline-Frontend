import { CommonModule } from '@angular/common';
import { Component, signal, computed, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProgramaService } from '../../../programas/services/programas.service';
import { ProgramasResponse } from '../../../programas/models/programas-response.model';
import { AdherirEstudianteAProgramaRequest } from '../../../programas/models/programas-request.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdherirEstudianteProgramaResponse } from '../../models/adherir-estudiante-programa.model';
import { NzAlertModule } from 'ng-zorro-antd/alert';
@Component({
  selector: 'app-adherirse-programa',
  standalone: true,
  imports: [CommonModule,NzTableModule,NzInputModule,NzPaginationModule,NzCardModule,ReactiveFormsModule,NzAlertModule],
  templateUrl: './adherirse-programa.component.html',
  styleUrl: './adherirse-programa.component.scss'
})
export class AdherirseProgramaComponent {
 form!: FormGroup;
 programas: ProgramasResponse[] = [];
 loading = true;
 programaAsignado!: string | null;
 estudianteYaAdherido = false;

 programaSeleccionado = signal<AdherirEstudianteAProgramaRequest | null>(null);
 respuestaSolicitud = signal<AdherirEstudianteProgramaResponse | null>(null);

  constructor(private fb: FormBuilder, private _programaService: ProgramaService, private message: NzMessageService) {
    // Effect para ejecutar cuando cambia programaSeleccionado
    effect(() => {
      const programa = this.programaSeleccionado();
      if (programa) {
        this.enviarSolicitud(programa);
      }
    });
  }

  ngOnInit(): void {
    const estudiante = JSON.parse(localStorage.getItem('usuario') || '{}');

    this.form = this.fb.group({
      estudiante: [{ value: `${estudiante.nombreCompleto} (${estudiante.email})`, disabled: true }],
      programaSeleccionado: [null]
    });

     this.obtenerProgramas();
     this.obtenerProgramaDelEstudiante(estudiante.estudianteId);
  }

   obtenerProgramas(): void {
    this._programaService.getAll().subscribe({
      next: (data) => {
        this.programas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener programas', err);
        this.loading = false;
      }
    });
  }

  obtenerProgramaDelEstudiante(estudianteId: number) {
  this._programaService.obtenerProgramaEstudiante(estudianteId).subscribe({
    next: (response) => {
      console.log("Respuesta del servicio:", response); // Verificar la respuesta en consola
        this.estudianteYaAdherido = false;
        this.programaAsignado = null;
      if (response.isSuccess && response.programa) {
        this.estudianteYaAdherido = true;
        this.programaAsignado = response.programa;
      } else {

      }
    },
    error: (err) => {
      console.error("Error al obtener el programa del estudiante:", err);
      this.estudianteYaAdherido = false;
      this.programaAsignado = null;
    }
  });
}

  adherirPrograma() {
    const estudiante = JSON.parse(localStorage.getItem('usuario') || '{}');

    const adherirEstudiante: AdherirEstudianteAProgramaRequest = {
           EstudianteId: estudiante.estudianteId,
           ProgramaId: this.form.value.programaSeleccionado.id
         };

    this.programaSeleccionado.set(adherirEstudiante);
  }
enviarSolicitud(adherirEstudiante: AdherirEstudianteAProgramaRequest) {
  this._programaService.adherirprograma(adherirEstudiante).subscribe({
    next: (response) => {
      console.log("Response recibido:", response); // Verificar qué está devolviendo el API

      this.estudianteYaAdherido = response.isSuccess;
      this.respuestaSolicitud.set({
        isSuccess: response.isSuccess,
        message: response.message,
        programa: response.programa
      });

      console.info("Signal actualizado:", this.respuestaSolicitud());

      if (response.isSuccess) {
        this.message.success(response.message);
      } else {
        this.message.error(response.message);
      }

      console.info("Programa:", this.respuestaSolicitud()?.programa);
    },
    error: (err) => {
      console.error('Error inesperado:', err);
    }
  });
}

inscribirMaterias(){

}

  guardarSeleccion() {
    const seleccion = this.form.value.programaSeleccionado.id;
    if (seleccion) {
        console.log('Programa adherido:', seleccion);
      // Aquí iría llamada a servicio
    }
  }
}
