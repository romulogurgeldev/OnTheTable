import { OrderService } from 'src/app/services/orders/order.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-historico-pedidos',
  templateUrl: './historico-pedidos.component.html',
  styleUrls: ['./historico-pedidos.component.scss']
})
export class HistoricoPedidosComponent implements OnInit {
  @Output() abrirChange = new EventEmitter<any>();
  @Input() abrir: any;
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;
  @Output() pedidoChange = new EventEmitter<any>();
  @Input() pedido: any;
  ordersEspera: any;
  ordersPreparacao: any;
  orders: any;
  sumMonth = false;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
   
    this.pegaPedidos(6)
  }
  pegaPedidos(status: number){
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

    })
  }

  abrirJanela(id: any){
    this.abrirChange.emit(true);
    this.modeChange.emit(3);
    this.pedidoChange.emit(id);
  }
}
