import { Component,Input,NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { MateriasService } from '../../../materias/services/materias.service';
import { MateriaProfesor } from '../../../materias/models/materia-response.model';
import { SeleccionMateriasRequest } from '../../../materias/models/seleccion-materias-request';
import { EstudianteService } from '../../services/estudiante.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-seleccionar-materias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NzFormModule,NzFormModule,NzCardModule,NzSelectModule,NzButtonModule],
  templateUrl: './seleccionar-materias.component.html',
  styleUrl: './seleccionar-materias.component.scss'
})
export class SeleccionarMateriasComponent implements OnInit {
  @Input() estudiante!: { estudianteId: number, nombreCompleto: string; email: string };
  formSelectMaterias!: FormGroup;
  materiasDisponibles: MateriaProfesor[] = [];
  loading = true;
  errorMessage = '';
  materiasOpciones: { label: string; value: number }[] = [];
  constructor(
    private fb: FormBuilder,
    private _estudianteService: EstudianteService,
    private _materiasService: MateriasService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.obtenerMateriasConProfesores();

  this.formSelectMaterias = this.fb.group({
    materias: [[], [this.validarMaximoTresMaterias.bind(this), this.validarProfesoresUnicos.bind(this)]]
  });
  }

  validarMaximoTresMaterias(control: any) {
    const seleccionadas = control.value;
    return seleccionadas && seleccionadas.length > 3
      ? { maximoTres: true }
      : null;
  }

  validarProfesoresUnicos(control: any) {
    const seleccionadas: number[] = control.value;
    const profesores = seleccionadas.map(id => {
      const materia = this.materiasDisponibles.find(m => m.id === id);
      return materia?.profesorId;
    });

    const repetidos = profesores.filter((p, i) => profesores.indexOf(p) !== i);
    return repetidos.length > 0 ? { profesorRepetido: true } : null;
  }

   obtenerMateriasConProfesores(): void {
    this._materiasService.getSubjectsWithProfessors().subscribe({
      next: (response) => {
        this.materiasDisponibles = response;
          this.materiasOpciones = this.materiasDisponibles.map(m => ({
            label: `${m.nombreMateria} - ${m.profesorNombre}`,
            value: m.id
          }));

        console.info(this.materiasDisponibles);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener las materias.';
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }
guardarSeleccion(): void {
  if (this.formSelectMaterias.invalid) return;

  const materiaIds = this.formSelectMaterias.value.materias;

  if (materiaIds.length > 3) {
    this.message.error('Solo puedes seleccionar hasta 3 materias.');
    return;
  }

  const request: SeleccionMateriasRequest = {
    estudianteId: this.estudiante.estudianteId,
    materiaIds: materiaIds,
  };

  this._estudianteService.guardarMateriasSeleccionadas(request).subscribe({
    next: (response) => {
      if (response) {
        this.message.success('Materias seleccionadas guardadas correctamente.');
      } else {
        this.message.error('Ocurrió un error al guardar la selección.');
      }
    },
    error: (err) => {
      console.error('Error en la solicitud:', err);
      this.message.error('Ocurrió un error al guardar la selección.');
    }
  });
}
  onSubmit(): void {
    debugger;
    if (this.formSelectMaterias.invalid) return;
    const seleccionadas = this.formSelectMaterias.value.materias.map((id: number) =>
      this.materiasDisponibles.find(m => m.id === id)
    );
    console.log('Materias seleccionadas:', seleccionadas);
    this.guardarSeleccion();

  }
}
