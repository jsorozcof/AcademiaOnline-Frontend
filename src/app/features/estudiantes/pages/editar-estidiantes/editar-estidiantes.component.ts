import { Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editar-estidiantes',
  standalone: true,
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-estidiantes.component.html',
  styleUrl: './editar-estidiantes.component.scss'
})
export class EditarEstidiantesComponent {
  modalVisible = false;
  formularioEstudiante!: FormGroup;
  estudianteSeleccionado!: any;
  estudianteId!: string;

  constructor(private fb: FormBuilder,private route: ActivatedRoute) {
    this.estudianteId = this.route.snapshot.paramMap.get('id')!;
    // Aquí puedes cargar los datos del estudiante con el id.
  }
   editar(estudiante: any): void {
    this.estudianteSeleccionado = estudiante;
    this.formularioEstudiante = this.fb.group({
      nombre: [estudiante.nombre],
      email: [estudiante.email],
      nombrePrograma: [estudiante.nombrePrograma],
      programa_Creditos: [estudiante.programa_Creditos]
    });
    this.modalVisible = true;
  }


  cerrarModal(): void {
    this.modalVisible = false;
  }

  guardarCambios(): void {
    console.log('Cambios guardados:', this.formularioEstudiante.value);
    this.cerrarModal();
  }
}
