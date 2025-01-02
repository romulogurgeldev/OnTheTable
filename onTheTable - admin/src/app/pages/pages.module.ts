import { MatIconModule } from '@angular/material/icon';
import { CustomPipes } from './../pipes/customPipes';
import { SearchPipe } from './../pipes/search.pipe';

import { FormModule } from './../forms/form.module';
import { SharedModule } from './../shared/shared.module';
import { RoutingModule } from './routing.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NaoLogadoComponent } from '../layout/nao-logado/nao-logado.component';
import { LogadoComponent } from '../layout/logado/logado.component';
import { httpInterceptorProviders } from '../services/http-interceptors';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { SaibaMaisComponent } from './saiba-mais/saiba-mais.component';
import { ContatoComponent } from './contato/contato.component';
import { PrecosComponent } from './precos/precos.component';
import { RestaurantLayoutComponent } from '../layout/restaurant-layout/restaurant-layout.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { MesasComponent } from './mesas/mesas.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { MesasConfigComponent } from './mesas-config/mesas-config.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { CozinhaComponent } from './cozinha/cozinha.component';
import { ConfigGeraisComponent } from './config-gerais/config-gerais.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HistoricoComponent } from './historico/historico.component';
import { PromocoesComponent } from './promocoes/promocoes.component';
import { DeliveryComponent } from './delivery/delivery.component';


@NgModule({
  declarations: [
    LogadoComponent,
    NaoLogadoComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    InicioComponent,
    SaibaMaisComponent,
    ContatoComponent,
    PrecosComponent,
    RestaurantLayoutComponent,
    CardapioComponent,
    MesasComponent,
    AjustesComponent,
    MesasConfigComponent,
    EditUserComponent,
    EsqueceuSenhaComponent,
    CozinhaComponent,
    ConfigGeraisComponent,
    HistoricoComponent,
    PromocoesComponent,
    DeliveryComponent,



  ],
  imports: [
    CommonModule,
    RoutingModule,
    HttpClientModule,
    SharedModule,
    FormModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatIconModule,

  ],
  exports:[],
  providers: [   {provide: LocationStrategy, useClass: HashLocationStrategy}, 
    httpInterceptorProviders]
})
export class PagesModule { }
