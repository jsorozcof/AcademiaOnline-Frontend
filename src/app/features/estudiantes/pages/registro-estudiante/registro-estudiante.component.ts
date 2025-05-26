import { Component, computed, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../../models/estudiante.model';

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
import { NzMessageService } from 'ng-zorro-antd/message';
import { EstudianteRequest } from '../../models/estudiante-request.model';
import { EstudianteService } from '../../services/estudiante.service';

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
  private readonly _estudianteService = inject(EstudianteService);


  createEstform!: FormGroup;
  // Estado con signals
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  errorMessage = signal<string | null>(null);

  loading = signal<boolean>(false);

  constructor() {
     this.createEstform = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    effect(() => {
      if (this.submitSuccess()) {
           this.message.success('✅ Estudiante creado correctamente');
           this.createEstform.reset();
      }

      if (this.errorMessage()) {
         this.message.error(`❌ ${this.errorMessage()}`);
      }
    });

  }




    onSubmitCreate(): void {
    if (this.createEstform.invalid) {
      this.createEstform.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.submitSuccess.set(false);

    const request: EstudianteRequest = this.createEstform.value;

    this._estudianteService.create(request).subscribe({
     next: (resultado: boolean) => {
        if (resultado) {
          this.submitSuccess.set(true);
          this.errorMessage.set('¡Perfecto! El estudiante se registró correctamente.');
        } else {
          this.errorMessage.set('La creación del estudiante falló. Intenta nuevamente.');
        }
      },
      complete: () => {
        this.isSubmitting.set(false);
      }
    });
  }
}
