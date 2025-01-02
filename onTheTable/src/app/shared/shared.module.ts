import { SearchPipe } from './../pipes/search.pipe';
import { FormModule } from './../form/form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaoLogadoHeaderComponent } from './nao-logado-header/nao-logado-header.component';
import { LogadoHeaderComponent } from './logado-header/logado-header.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { MeusPedidosComponent } from './meus-pedidos/meus-pedidos.component';
import { MinhaMesaComponent } from './minha-mesa/minha-mesa.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { AbreProdutoComponent } from './abre-produto/abre-produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { ResultadoPesquisaComponent } from './resultado-pesquisa/resultado-pesquisa.component';
import { TipoPagamentoComponent } from './tipo-pagamento/tipo-pagamento.component';
import { MessagesComponent } from './messages/messages.component';
import { ListaComplementosComponent } from './lista-complementos/lista-complementos.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    NaoLogadoHeaderComponent,
    LogadoHeaderComponent,
    MenuLateralComponent,
    MeusPedidosComponent,
    MinhaMesaComponent,
    MinhaContaComponent,
    ListaCategoriasComponent,
    ListaProdutosComponent,
    AbreProdutoComponent,
    ResultadoPesquisaComponent,
    SearchPipe,
    TipoPagamentoComponent,
    MessagesComponent,
    ListaComplementosComponent,

  ],
  exports:[
    NaoLogadoHeaderComponent,
    LogadoHeaderComponent,
    MenuLateralComponent,
    MeusPedidosComponent,
    MinhaMesaComponent,
    MinhaContaComponent,
    ListaCategoriasComponent,
    ListaProdutosComponent,
    AbreProdutoComponent,
    FormsModule,
    ResultadoPesquisaComponent,
    TipoPagamentoComponent,
    MessagesComponent,
    ListaComplementosComponent,



  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
  ]
})
export class SharedModule { }
