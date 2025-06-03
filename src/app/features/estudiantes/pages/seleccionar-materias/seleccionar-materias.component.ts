import { Component,Input,NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { MateriasService } from '../../../materias/services/materias.service';
import { MateriaProfesor } from '../../../materias/models/materia-response.model';

@Component({
  selector: 'app-seleccionar-materias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NzFormModule,NzFormModule,NzCardModule,NzSelectModule,NzButtonModule],
  templateUrl: './seleccionar-materias.component.html',
  styleUrl: './seleccionar-materias.component.scss'
})
export class SeleccionarMateriasComponent implements OnInit {
  @Input() estudiante!: { nombreCompleto: string; email: string };
  form!: FormGroup;
  materiasDisponibles: MateriaProfesor[] = [];
  //materiasProfesor: MateriaProfesor[] = [];
  loading = true;
  errorMessage = '';
  materiasOpciones: { label: string; value: number }[] = [];
  constructor(private fb: FormBuilder, private _materiasService: MateriasService) {}

  ngOnInit(): void {
    this.obtenerMateriasConProfesores();

  this.form = this.fb.group({
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
  onSubmit(): void {
    if (this.form.invalid) return;
    const seleccionadas = this.form.value.materias.map((id: number) =>
      this.materiasDisponibles.find(m => m.id === id)
    );
    console.log('Materias seleccionadas:', seleccionadas);
  }
}
