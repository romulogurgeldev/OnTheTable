import { OrderService } from './../../services/orders/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {
  escolhido = "ativos";
  ordersPreparacao: any;
  ordersEspera: any;
  orders: any;
  CLOCK: any
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

    this.atualizaPagina();
  }
  pegaPedido(status: number){
    clearTimeout(this.CLOCK)
    // 0 pedido cancelado
    // 1 pedido em espera
    // 2 preparando pedido
    // 3 pedido pronto
    this.orderService.getAllByStatus(status).subscribe(res=>{
      console.log(res)
      if (status == 1){
        this.ordersEspera = res;

      }
      else if (status == 2){
        this.ordersPreparacao = res;

      }
      else{
        this.orders = res;
      }
      this.CLOCK = setTimeout(() => {
        this.pegaPedido(status);
      }, 8000)
    })
  }
  atualizaPagina(){
    this.pegaPedido(1);
    this.pegaPedido(2);
  }
  changeStatusPedido(item: any, status: string){
    let dados: any = {
      active: status=="Pedido cancelado" ? false : true,
      status: status
    }
    item.active = status=="Pedido cancelado" ? false : true;
    item.status = status;

    if (status=="Pedido cancelado"){
      item.dateCancelado = new Date();
    }
    else if (status=="Preparando pedido"){
      item.dateConfirma = new Date();
    }
    else if (status=="Pedido pronto"){
      item.datePreparado = new Date();
    }
    console.log(item)

    this.orderService.editStatus(item._id, item).subscribe(res=>{
      console.log(res)
      this.ordersEspera = null;
      this.ordersPreparacao = null;
      this.atualizaPagina();
    })
  }

}
