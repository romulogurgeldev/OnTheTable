import { MesasService } from 'src/app/services/mesas/mesas.service';
import { OrderService } from './../../services/order/order.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {
  @Output() mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  @Output() pagamentoChange = new EventEmitter<any>();
  @Input() pagamento: any;

  pedido: any;
  id: any;
  gorjeta = 10;
  subtotal = 0;
  total = 0;
  constructor(private orderService: OrderService, private mesasService: MesasService) { }

  ngOnInit(): void {
    const url = window.location.href.split('/');
    this.id = url[url.length-1];
    this.mesasService.getOneByCode(this.id).subscribe(res=>{
      const result: any = res;
      this.orderService.getOneActive(result._id).subscribe(result2 => {
        this.pedido = result2;
        console.log(this.pedido)
        this.calculaTotal();
      })
    })

  }
  changeGorjeta(event: any){
    this.gorjeta = event.value;
    this.calculaTotal();
  }
  calculaTotal(){
    this.subtotal = 0;
    for (let i = 0; i < this.pedido.length; i++) {
      this.subtotal = this.subtotal + this.pedido[i].originalPrice;
      
    }
    this.total = ((this.gorjeta/100)*this.subtotal)+this.subtotal;
  }
  abrirPagamento(){
    
    this.pagamentoChange.emit(true);
  }
  

}
