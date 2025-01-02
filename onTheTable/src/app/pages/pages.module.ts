
import { SharedModule } from './../shared/shared.module';
import { RoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NaoLogadoComponent } from '../layout/nao-logado/nao-logado.component';
import { LogadoComponent } from '../layout/logado/logado.component';
import { HomeMesaComponent } from './home-mesa/home-mesa.component';
import { FormModule } from '../form/form.module';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { CameraComponent } from './camera/camera.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { MesaComponent } from './mesa/mesa.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PageMessagesComponent } from './page-messages/page-messages.component';
import { ReservarComponent } from './reservar/reservar.component';
import { ReservarHomeComponent } from './reservar-home/reservar-home.component';




@NgModule({
  declarations: [
   
  
    LogadoComponent,
    NaoLogadoComponent,
    LoginComponent,
    HomeComponent,
    HomeMesaComponent,
    CameraComponent,
    MesaComponent,
    CarrinhoComponent,
    PerfilComponent,
    PedidosComponent,
    PageMessagesComponent,
    ReservarComponent,
    ReservarHomeComponent,

  ],
  imports: [
    CommonModule,
    RoutingModule,
    FormModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    NgQrScannerModule,
    NgxScannerQrcodeModule,



  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class PagesModule { }
