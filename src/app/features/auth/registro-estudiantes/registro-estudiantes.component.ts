import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthRegisterRequest } from '../models/AuthUserRequest';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-registro-estudiantes',
  standalone: true,
  imports: [
       CommonModule, ReactiveFormsModule, RouterLink,
       NzFormModule, NzInputModule, NzButtonModule,
       NzLayoutModule, NzMenuModule, NzIconModule
  ],
  templateUrl: './registro-estudiantes.component.html',
  styleUrl: './registro-estudiantes.component.scss'
})
export class RegistroEstudiantesComponent {
    registroForm: FormGroup;
    constructor(private fb: FormBuilder, private _authService: AuthService,private message: NzMessageService) {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: [this.passwordsMatchValidator],

    });
  }

    registrar(): void {
    if (this.registroForm.valid) {
      const params: AuthRegisterRequest = {
        Nombre: this.registroForm.value.nombre!,
        Correo: this.registroForm.value.correo!,
        Password: this.registroForm.value.password!
      };

      this._authService.register(params).subscribe({
        next: (response) => {
          //this._authService.setUser(response);
          console.error("response:", response);
          if(response){
               this.message.success('Alumno registrado con exito');
               this.registroForm.reset();
          }else{
            this.message.error('¡Ups! Algo no salió bien. Inténtalo de nuevo.');
            this.registroForm.reset();
          }
        },
        error: (err) => {
          this.message.error('El usuario no existe o las credenciales son incorrectas.');
          this.registroForm.reset();
        }
      });
    } else {
      this.message.warning('Por favor, completa todos los campos.');
    }
  }

    passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get password(): AbstractControl {
    return this.registroForm.get('password')!;
  }

  get confirmPassword(): AbstractControl {
    return this.registroForm.get('confirmPassword')!;
  }
  get email(): AbstractControl {
  return this.registroForm.get('correo')!;
}
}
