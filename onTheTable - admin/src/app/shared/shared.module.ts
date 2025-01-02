import { SearchPipe } from './../pipes/search.pipe';
import { CustomPipes } from './../pipes/customPipes';


import { NgModule, Pipe } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NaoLogadoHeaderComponent } from './nao-logado-header/nao-logado-header.component';
import { LogadoHeaderComponent } from './logado-header/logado-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ListaRestauranteComponent } from './lista-restaurante/lista-restaurante.component';
import { ListaFuncionariosComponent } from './lista-funcionarios/lista-funcionarios.component';
import { AddFuncionarioComponent } from './add-funcionario/add-funcionario.component';
import { FormModule } from '../forms/form.module';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { ListaMesasConfigComponent } from './lista-mesas-config/lista-mesas-config.component';
import { ListaEspacosComponent } from './lista-espacos/lista-espacos.component';
import { PerfilFuncionarioComponent } from './perfil-funcionario/perfil-funcionario.component';

import { VerProdutoComponent } from './ver-produto/ver-produto.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { PerfilMesaComponent } from './perfil-mesa/perfil-mesa.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ListaMesasComponent } from './lista-mesas/lista-mesas.component';
import { PerfilMesaPedidoComponent } from './perfil-mesa-pedido/perfil-mesa-pedido.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { FecharPedidoComponent } from './fechar-pedido/fechar-pedido.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ListaProdutoComponent } from './lista-produto/lista-produto.component';
import { CartComponent } from './cart/cart.component';
import { ListaPromocoesComponent } from './lista-promocoes/lista-promocoes.component';
import { ListaDeliveryComponent } from './lista-delivery/lista-delivery.component';
import { ListaProdutosPromocoesComponent } from './lista-produtos-promocoes/lista-produtos-promocoes.component';
import { HistoricoMaisVendidosComponent } from './historico-mais-vendidos/historico-mais-vendidos.component';
import { HistoricoMesasVendasComponent } from './historico-mesas-vendas/historico-mesas-vendas.component';
import { HistoricoPedidosComponent } from './historico-pedidos/historico-pedidos.component';
import { HistoricoMaisVendidosCompletoComponent } from './historico-mais-vendidos-completo/historico-mais-vendidos-completo.component';
import { HistoricoMesasVendasCompletoComponent } from './historico-mesas-vendas-completo/historico-mesas-vendas-completo.component';
import { HistoricoPedidosCompletoComponent } from './historico-pedidos-completo/historico-pedidos-completo.component';
import { BatepapoComponent } from './batepapo/batepapo.component';
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component';
import { ListaComplementosComponent } from './lista-complementos/lista-complementos.component';
import { PerfilComplementosComponent } from './perfil-complementos/perfil-complementos.component';
import { CadastrarRestauranteComponent } from './lista-restaurante/components/cadastrar-restaurante/cadastrar-restaurante.component';


@NgModule({
  declarations: [
    NaoLogadoHeaderComponent,
    LogadoHeaderComponent,
    PerfilUsuarioComponent,
    ListaRestauranteComponent,
    ListaFuncionariosComponent,
    AddFuncionarioComponent,
    MenuLateralComponent,
    ListaCategoriasComponent,
    ListaMesasConfigComponent,
    ListaEspacosComponent,
    PerfilFuncionarioComponent,
    VerProdutoComponent,
    PerfilMesaComponent,
    ListaMesasComponent,
    PerfilMesaPedidoComponent,
    ListaPedidosComponent,
    FecharPedidoComponent,
    ListaProdutoComponent,
    CartComponent,
    ListaPromocoesComponent,
    ListaDeliveryComponent,
    ListaProdutosPromocoesComponent,
    HistoricoMaisVendidosComponent,
    HistoricoMesasVendasComponent,
    HistoricoPedidosComponent,
    HistoricoMaisVendidosCompletoComponent,
    HistoricoMesasVendasCompletoComponent,
    HistoricoPedidosCompletoComponent,
    BatepapoComponent,
    ListaReservasComponent,
    ListaComplementosComponent,
    PerfilComplementosComponent,
    CadastrarRestauranteComponent,



  ],
  exports:[
    NaoLogadoHeaderComponent,
    LogadoHeaderComponent,
    PerfilUsuarioComponent,
    ListaRestauranteComponent,
    ListaFuncionariosComponent,
    AddFuncionarioComponent,
    MenuLateralComponent,
    ListaCategoriasComponent,
    VerProdutoComponent,
    PerfilMesaComponent,
    ListaMesasComponent,
    PerfilMesaPedidoComponent,
    ListaPedidosComponent,
    FecharPedidoComponent,
    ListaPromocoesComponent,
    ListaDeliveryComponent,
    ListaProdutosPromocoesComponent,
    HistoricoMaisVendidosComponent,
    HistoricoMesasVendasComponent,
    HistoricoPedidosComponent,
    HistoricoMaisVendidosCompletoComponent,
    HistoricoMesasVendasCompletoComponent,
    HistoricoPedidosCompletoComponent,
    BatepapoComponent,
    ListaReservasComponent,
    ListaComplementosComponent,
    PerfilComplementosComponent,

    
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormModule,
    MatSlideToggleModule,
    MatSliderModule,
    NgxQRCodeModule,
    QRCodeModule,
    MatProgressSpinnerModule,
    CustomPipes

  ],
  
})
export class SharedModule { }
