import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';


// Importaciones de Ng Zorro
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message'

import { AuthRoutingModule } from '../auth-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { UserSessionService } from '../../../core/auth/user/user-session.service';
import { AuthUserRequest } from '../models/AuthUserRequest';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, ReactiveFormsModule,
    NzFormModule, NzInputModule, NzButtonModule,
    NzLayoutModule, NzMenuModule, NzIconModule
  ],
  templateUrl: './login.component.html',
 styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 isLoadingTwo = false;

 private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required])
  });
 errorMessage = signal<string | null>(null);
  submitForm(): void {
    console.log('submit', this.validateForm.value);
    this.login();
  }
  constructor(
        private _userSession: UserSessionService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
         private message: NzMessageService
  ){}


    login(): void {
    if (this.validateForm.valid) {
      const params: AuthUserRequest = {
        UserName: this.validateForm.value.username!,
        Password: this.validateForm.value.password!
      };

      this._authService.login(params).subscribe({
        next: (response) => {
          //this._authService.setUser(response);
          console.error("response:", response);
          if(response.isSuccess){
          this._router.navigate(['/welcome']);

          }else{
            this.message.error('El usuario no existe o las credenciales son incorrectas.');
            this.validateForm.reset();
          }
        },
        error: (err) => {
          this.errorMessage.set(err.message);
          this.message.error('El usuario no existe o las credenciales son incorrectas.');
          this.validateForm.reset();
        }
      });
    } else {
      this.message.warning('Por favor, completa todos los campos.');
    }
  }
}
