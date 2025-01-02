import { OrderService } from 'src/app/services/orders/order.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-historico-pedidos-completo',
  templateUrl: './historico-pedidos-completo.component.html',
  styleUrls: ['./historico-pedidos-completo.component.scss']
})
export class HistoricoPedidosCompletoComponent implements OnInit {
  @Output() pedidoChange = new EventEmitter<any>();
  @Input() pedido: any;
  orderMesa: any;
  conta: any = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.infoPedido();
  }
  ngOnChanges(changes: SimpleChanges) {

    this.infoPedido()
  }
  infoPedido(){
    this.conta = 0;
    if (this.pedido.orderTable){
      console.log(this.pedido.orderTable)
      this.orderService.getOneOrderTables(this.pedido.orderTable).subscribe((res)=>{
        this.orderMesa = res;
      })
    }
    for (let i = 0; i < this.pedido.orderFood.length; i++) {
      console.log(this.pedido.orderFood[i])
      this.conta = this.conta + (this.pedido.orderFood[i].quantidade * this.pedido.orderFood[i].priceFood)
      
    }
  }
}
