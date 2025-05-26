import { Component, effect, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Estudiante } from '../../models/estudiante.model';
import { ProgramasResponse } from '../../../programas/models/programas-response.model';
import { MateriasResponse } from '../../../materias/models/materia-response.model';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { MateriasService } from '../../../materias/services/materias.service';
import { ProgramaService } from '../../../programas/services/programas.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
@Component({
  selector: 'app-adherir-programa-form',
  standalone: true,
   imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzTableModule,
    NzButtonModule,
  // Ng-Zorro
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule
  ],
   template: `
    <form [formGroup]="estRegisterform" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-label [nzSpan]="6">Nombre</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <input nz-input formControlName="nombre" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6">Email</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <input nz-input formControlName="email" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6">Programa</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <nz-select formControlName="programa" nzPlaceHolder="Seleccione un programa">
          <nz-option
            *ngFor="let m of programas()"
            [nzValue]="m.id"
            [nzLabel]="m.nombre"
          />
          </nz-select>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6">Materias</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <nz-select
            formControlName="materiasSeleccionadas"
            nzMode="multiple"
            nzPlaceHolder="Seleccione 3 materias"
            [nzMaxTagCount]="3"
          >
          <nz-option
            *ngFor="let m of materias()"
            [nzValue]="m.id"
            [nzLabel]="m.nombre"
          />
          </nz-select>
        </nz-form-control>
    </nz-form-item>

    <button nz-button nzType="primary" [disabled]="estRegisterform.invalid">Registrar</button>
  </form>

  `,
  styleUrl: './adherir-programa-form.component.scss'
})
export class AdherirProgramaFormComponent {

  private fb = inject(FormBuilder);
  private message = inject(NzMessageService);
  private readonly _materiasService = inject(MateriasService);
  private readonly _programaService = inject(ProgramaService);

estRegisterform!: FormGroup;
  // Signals
  //materias = signal<Materia[]>([]);
  programas = signal<ProgramasResponse[]>([]);
  //materiasFiltradas = signal<Materia[]>([]);

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


  onSubmit() {
    if (this.estRegisterform.valid && !this.materiasInvalidas()) {
      const estudiante: Estudiante = this.estRegisterform.value;
      // Aquí llamarías al servicio para guardar
      console.log('Estudiante registrado:', estudiante);
      this.message.success('¡Estudiante registrado exitosamente!');
    }
  }
}
