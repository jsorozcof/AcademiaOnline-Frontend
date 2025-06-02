import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Ng-Zorro UI Modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    LoginComponent
  ]
})
export class AuthModule {}
