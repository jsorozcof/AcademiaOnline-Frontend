import { Component, computed, effect, inject, signal } from '@angular/core';
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
import { MateriasService } from '../../../materias/services/materias.service';
import { MateriasResponse } from '../../../materias/models/materia-response.model';
import { ProgramaService } from '../../../programas/services/programas.service';
import { ProgramasResponse } from '../../../programas/models/programas-response.model';

interface Materia {
  id: number;
  nombre: string;
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
  private readonly _materiasService = inject(MateriasService);
  private readonly _programaService = inject(ProgramaService);

  estRegisterform!: FormGroup;
  // Signals
  //materias = signal<Materia[]>([]);
  programas = signal<ProgramasResponse[]>([]);
  materiasFiltradas = signal<Materia[]>([]);

  materias = signal<MateriasResponse[]>([]);
  error = signal<string | null>(null);
  loading = signal<boolean>(false);

  constructor() {
     this.estRegisterform = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      programa: ['', Validators.required],
      materiasSeleccionadas: [[], [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });

    this.loadMateriasEffect();
    this.loadProgramasEffect();
    // Carga simulada
    /**
     * this.programas.set([
      { id: 1, nombre: 'Programa A' },
      { id: 2, nombre: 'Programa B' },
    ]);
     */

   /**
    *  this.materias.set([
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
    */

    // Effect para filtrar materias sin repetir profesor
    /**
     * effect(() => {
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
     */
  }

  // Signal computado para detectar profesores duplicados
  /**
   *
   * profesoresDuplicados = computed(() => {
    const seleccionadas: number[] = this.estRegisterform.get('materiasSeleccionadas')?.value || [];
    const materiasSeleccionadas = this.materias().filter(m => seleccionadas.includes(m.id));
    const profesorIds = materiasSeleccionadas.map(m => m.profesorId);
    return new Set(profesorIds).size !== profesorIds.length; // true si hay duplicados
  });
   */

  materiasInvalidas(): boolean {
    const ids = this.estRegisterform.get('materiasIds')?.value as number[];
    return ids.length !== 3;
  }
 private loadMateriasEffect() {
    effect(() => {
      this.loading.set(true);
      this._materiasService.getAll().subscribe({
        next: (data) => {
          this.materias.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message || 'Error al cargar materias');
          this.loading.set(false);
        }
      });
    },{ allowSignalWrites: true });
  }

   private loadProgramasEffect() {
    effect(() => {
      this.loading.set(true);
      this._programaService.getAll().subscribe({
        next: (data) => {
          this.programas.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message || 'Error al cargar los programas academicos');
          this.loading.set(false);
        }
      });
    },{ allowSignalWrites: true });
  }

  /**
   *  private validateProfesorUnicoEffect() {
    effect(() => {
      if (this.profesoresDuplicados()) {
        this.estRegisterform.get('materiasSeleccionadas')?.setErrors({ profesorDuplicado: true });
      } else {
        this.estRegisterform.get('materiasSeleccionadas')?.setErrors(null);
      }
    });
  }
   */
  onSubmit() {
    if (this.estRegisterform.valid && !this.materiasInvalidas()) {
      const estudiante: Estudiante = this.estRegisterform.value;
      // Aquí llamarías al servicio para guardar
      console.log('Estudiante registrado:', estudiante);
      this.message.success('¡Estudiante registrado exitosamente!');
    }
  }
}
