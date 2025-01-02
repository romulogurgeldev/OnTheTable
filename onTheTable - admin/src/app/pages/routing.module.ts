import { AuthGuardAdmGuard } from './../guards/auth-guard-adm.guard';
import { ConfigGeraisComponent } from './config-gerais/config-gerais.component';
import { HomeComponent } from './home/home.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LogadoComponent } from '../layout/logado/logado.component';

import { NaoLogadoComponent } from '../layout/nao-logado/nao-logado.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContatoComponent } from './contato/contato.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PrecosComponent } from './precos/precos.component';
import { SaibaMaisComponent } from './saiba-mais/saiba-mais.component';
import { NoAuthGuard } from '../guards/no-auth.guard';
import { RestaurantLayoutComponent } from '../layout/restaurant-layout/restaurant-layout.component';
import { MesasComponent } from './mesas/mesas.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { MesasConfigComponent } from './mesas-config/mesas-config.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { CozinhaComponent } from './cozinha/cozinha.component';
import { HistoricoComponent } from './historico/historico.component';
import { PromocoesComponent } from './promocoes/promocoes.component';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
  {
    path:"",
    component: LogadoComponent,
    children:[
      {path:"",redirectTo: 'home', pathMatch: 'full'},
      {path:"home", component: HomeComponent},
      {path:"edit/:id", component: EditUserComponent},
      {path:"configuracoes/:id", component: ConfigGeraisComponent, pathMatch: 'full'},

  
      
     ],
    canActivate:[AuthGuardAdmGuard],
  },
  {
    path:"restaurante/:id",
    component: RestaurantLayoutComponent,
    children:[
      {path:"",redirectTo: 'pedidos/mesas', pathMatch: 'full'},
      {path:"pedidos/mesas", component: MesasComponent, pathMatch: 'full'},
      {path:"pedidos/cozinha", component: CozinhaComponent, pathMatch: 'full'},
      {path:"ajustes/cardapio", component: CardapioComponent, pathMatch: 'full'},
      {path:"ajustes/mesas-config", component: MesasConfigComponent, pathMatch: 'full'},
      {path:"ajustes/promocoes", component: PromocoesComponent, pathMatch: 'full'},
      {path:"historico", component: HistoricoComponent, pathMatch: 'full'},
      {path:"delivery", component: DeliveryComponent, pathMatch: 'full'},
     ],
    canActivate:[AuthGuard],
  },
  {
    path: '',
    component: NaoLogadoComponent,
    children:[
        {path:"",redirectTo: 'login', pathMatch: 'full'},
        {path:"login", component: LoginComponent, pathMatch: 'full'},
        {path:"cadastro", component: CadastroComponent, pathMatch: 'full'},
        {path:"esqueceu-senha", component: EsqueceuSenhaComponent, pathMatch: 'full'},
        {path:"inicio", component: InicioComponent, pathMatch: 'full'},
        {path:"saiba-mais", component: SaibaMaisComponent, pathMatch: 'full'},
        {path:"contato", component: ContatoComponent, pathMatch: 'full'},
        {path:"precos", component: PrecosComponent, pathMatch: 'full'},

      ],
    canActivate:[NoAuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }