import { Component, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../../models/estudiante.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

// Ng-Zorro Modules
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

interface Materia {
  id: number;
  nombre: string;
  profesorId: number;
}

interface Programa {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Ng-Zorro
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzMessageModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule
  ],
  templateUrl: './registro-estudiante.component.html',
  styleUrl: './registro-estudiante.component.scss'
})
export class RegistroEstudianteComponent {
  private fb = inject(FormBuilder);
  private message = inject(NzMessageService);
  estRegisterform!: FormGroup;
  // Signals
  materias = signal<Materia[]>([]);
  programas = signal<Programa[]>([]);
  materiasFiltradas = signal<Materia[]>([]);

  constructor() {

     this.estRegisterform = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      programa: ['', Validators.required],
      materias: [[], [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });

    // Carga simulada
    this.programas.set([
      { id: 1, nombre: 'Programa A' },
      { id: 2, nombre: 'Programa B' },
    ]);

    this.materias.set([
      { id: 1, nombre: 'Matemáticas', profesorId: 101 },
      { id: 2, nombre: 'Física', profesorId: 101 },
      { id: 3, nombre: 'Química', profesorId: 102 },
      { id: 4, nombre: 'Historia', profesorId: 103 },
      { id: 5, nombre: 'Biología', profesorId: 104 },
      { id: 6, nombre: 'Geografía', profesorId: 102 },
      { id: 7, nombre: 'Filosofía', profesorId: 105 },
      { id: 8, nombre: 'Inglés', profesorId: 103 },
      { id: 9, nombre: 'Arte', profesorId: 104 },
      { id: 10, nombre: 'Música', profesorId: 105 },
    ]);

    // Effect para filtrar materias sin repetir profesor
    effect(() => {
      const seleccionadas = this.estRegisterform.get('materiasIds')?.value || [];
      const materiasActuales = this.materias();
      const profesoresSeleccionados = seleccionadas.map(
        (id: number) => materiasActuales.find(m => m.id === id)?.profesorId
      );

      this.materiasFiltradas.set(
        materiasActuales.filter(m =>
          !profesoresSeleccionados.includes(m.profesorId) || seleccionadas.includes(m.id)
        )
      );
    }, { allowSignalWrites: true });
  }

  materiasInvalidas(): boolean {
    const ids = this.estRegisterform.get('materiasIds')?.value as number[];
    return ids.length !== 3;
  }

  onSubmit() {
    if (this.estRegisterform.valid && !this.materiasInvalidas()) {
      const estudiante: Estudiante = this.estRegisterform.value;
      // Aquí llamarías al servicio para guardar
      console.log('Estudiante registrado:', estudiante);
      this.message.success('¡Estudiante registrado exitosamente!');
    }
  }
}
