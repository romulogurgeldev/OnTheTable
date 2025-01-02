import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;
  @Output() mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  constructor(
    private orderService: OrderService, private mesaService: MesaService
  ) { }

  ngOnInit(): void {
  }

  async fazerPedido(){

    const dados = {
      restaurant: this.mesa.restaurant._id,
      table: this.mesa._id ,
      orderFood: this.mesa.cart,
      date: new Date(),
      status: "Aguardando confirmação...",
      active: true,
      
    }
    this.orderService.create(dados).subscribe(res => {

    })
    const tamanho = this.mesa.cart.length;
    await this.limpaCarrinho(tamanho);
    this.modeChange.emit(2);
  }
  async remover(id: string, index: number){
    this.mesa.cart.splice(index, 1);
    const result = await this.mesaService.deleteCart(id, index);
  }
  async editCart(id: string, index: number, valor: number){
    
    const result = await this.mesaService.editCart(id, index, valor);
  }
  async limpaCarrinho(tamanho: number){
    for (let i = 0; i < tamanho ; i++) {
      await this.remover(this.mesa._id, 0);
      
    }
  }
  async voltar(){
    await this.limpaCarrinho(this.mesa.cart.length);
    this.modeChange.emit(2);
  }
}
