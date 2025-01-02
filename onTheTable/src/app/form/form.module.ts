import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadNomeComponent } from './cad-nome/cad-nome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginMesaComponent } from './login-mesa/login-mesa.component';
import { ChamaServicoComponent } from './chama-servico/chama-servico.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CadUserComponent } from './cad-user/cad-user.component';
import { CadPagamentoComponent } from './cad-pagamento/cad-pagamento.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { CadReservaComponent } from './cad-reserva/cad-reserva.component';
import { FormLoginUserComponent } from './form-login-user/form-login-user.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CadNomeComponent,
    LoginMesaComponent,
    ChamaServicoComponent,
    CadUserComponent,
    CadPagamentoComponent,
    FormLoginComponent,
    CadReservaComponent,
    FormLoginUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    CadNomeComponent,
    LoginMesaComponent,
    ChamaServicoComponent,
    CadUserComponent,
    CadPagamentoComponent,
    FormLoginComponent,
    FormLoginUserComponent,
    CadReservaComponent,


    
  ]
})
export class FormModule { }
