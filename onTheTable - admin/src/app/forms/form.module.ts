import { CustomPipes } from './../pipes/customPipes';


import { AlertErroComponent } from './../shared/alert-erro/alert-erro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginFormsComponent } from './login-forms/login-forms.component';
import { FormsCadCepComponent } from './forms-cad-cep/forms-cad-cep.component';
import { FormsCadFuncionarioComponent } from './forms-cad-funcionario/forms-cad-funcionario.component';
import { FormsCadLoginComponent } from './forms-cad-login/forms-cad-login.component';
import { FormsCadPessoalComponent } from './forms-cad-pessoal/forms-cad-pessoal.component';
import { FormsCadRestauranteComponent } from './forms-cad-restaurante/forms-cad-restaurante.component';
import { FormsCadCategoriaComponent } from './forms-cad-categoria/forms-cad-categoria.component';
import { FormsCadFoodComponent } from './forms-cad-food/forms-cad-food.component';
import { FormsCadMesasComponent } from './forms-cad-mesas/forms-cad-mesas.component';
import { FormsEditUserComponent } from './forms-edit-user/forms-edit-user.component';
import { FormsEditCepComponent } from './forms-edit-cep/forms-edit-cep.component';
import { FormsEditLoginComponent } from './forms-edit-login/forms-edit-login.component';
import { ForgetPasswordEmailComponent } from './forget-password-email/forget-password-email.component';
import { ForgetPasswordCodeComponent } from './forget-password-code/forget-password-code.component';
import { FormsCadPasswordComponent } from './forms-cad-password/forms-cad-password.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsEditFoodComponent } from './forms-edit-food/forms-edit-food.component';
import { FormsEditCategoriaComponent } from './forms-edit-categoria/forms-edit-categoria.component';
import { FormsEditMesaComponent } from './forms-edit-mesa/forms-edit-mesa.component';
import { CadPromocaoComponent } from './cad-promocao/cad-promocao.component';
import { SearchPipe } from '../pipes/search.pipe';
import { FormCadPermissaoComponent } from './form-cad-permissao/form-cad-permissao.component';
import { FormsEditPromocaoComponent } from './forms-edit-promocao/forms-edit-promocao.component';
import { FormsCadComplementoComponent } from './forms-cad-complemento/forms-cad-complemento.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsEditComplementosComponent } from './forms-edit-complementos/forms-edit-complementos.component';
import { FormsEditRestaurantComponent } from './forms-edit-restaurant/forms-edit-restaurant.component';

@NgModule({
  declarations: [
    LoginFormsComponent,
    FormsCadCepComponent,
    FormsCadFuncionarioComponent,
    FormsCadLoginComponent,
    FormsCadPessoalComponent,
    FormsCadRestauranteComponent,
    FormsCadCategoriaComponent,
    FormsCadFoodComponent,
    FormsCadMesasComponent,
    FormsEditUserComponent,
    FormsEditCepComponent,
    FormsEditLoginComponent,
    AlertErroComponent,
    ForgetPasswordEmailComponent,
    ForgetPasswordCodeComponent,
    FormsCadPasswordComponent,
    UploadImageComponent,
    FormsEditFoodComponent,
    FormsEditCategoriaComponent,
    FormsEditMesaComponent,
    CadPromocaoComponent,
    FormCadPermissaoComponent,
    FormsEditPromocaoComponent,
    FormsCadComplementoComponent,
    FormsEditComplementosComponent,
    FormsEditRestaurantComponent,


  ],
  imports: [
    NgxMaskModule.forRoot(),
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    RouterModule,
    CustomPipes,
    MatRadioModule,


  ],
  exports:[
    LoginFormsComponent,
    FormsCadCepComponent,
    FormsCadFuncionarioComponent,
    FormsCadLoginComponent,
    FormsCadPessoalComponent,
    FormsCadRestauranteComponent,
    FormsCadCategoriaComponent,
    FormsCadFoodComponent,
    FormsCadMesasComponent,
    FormsEditUserComponent,
    FormsEditCepComponent,
    FormsEditLoginComponent,
    ForgetPasswordEmailComponent,
    ForgetPasswordCodeComponent,
    FormsCadPasswordComponent,
    FormsEditFoodComponent,
    FormsEditCategoriaComponent,
    FormsEditMesaComponent,
    MatSelectModule,
    MatSnackBarModule,
    AlertErroComponent,
    FormsModule,
    CadPromocaoComponent,
    FormCadPermissaoComponent,
    FormsEditPromocaoComponent,
    FormsCadComplementoComponent,
    FormsEditComplementosComponent,
    FormsEditRestaurantComponent,


  ]
})
export class FormModule { }
