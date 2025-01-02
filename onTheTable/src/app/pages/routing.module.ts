

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaoLogadoComponent } from '../layout/nao-logado/nao-logado.component';
import { CameraComponent } from './camera/camera.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { HomeMesaComponent } from './home-mesa/home-mesa.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MesaComponent } from './mesa/mesa.component';
import { PageMessagesComponent } from './page-messages/page-messages.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReservarHomeComponent } from './reservar-home/reservar-home.component';
import { ReservarComponent } from './reservar/reservar.component';

const routes: Routes = [
  {
    path: '',
    component: NaoLogadoComponent,
    children:[
        {path:"",redirectTo: 'home/mesa/a', pathMatch: 'full'},
        {path:"login", component: LoginComponent, pathMatch: 'full'},
        {path:"entrar", component: LoginComponent, pathMatch: 'full'},
        {path:"home", component: HomeComponent, pathMatch: 'full'},
        {path:"mesa/:id", component: HomeMesaComponent, pathMatch: 'full'},
        {path:"camera", component: CameraComponent, pathMatch: 'full'},
        {path:"minha-mesa/:id", component: MesaComponent, pathMatch: 'full'},
        {path:"carrinho/:id", component: CarrinhoComponent, pathMatch: 'full'},
        {path:"pedidos/:id", component: PedidosComponent, pathMatch: 'full'},
        {path:"perfil/:id", component: PerfilComponent, pathMatch: 'full'},
        {path:"messages/:id", component: PageMessagesComponent, pathMatch: 'full'},
        {path:"reservar/:id", component: ReservarComponent, pathMatch: 'full'},
        {path:"reservar", component: ReservarHomeComponent, pathMatch: 'full'},

      ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }