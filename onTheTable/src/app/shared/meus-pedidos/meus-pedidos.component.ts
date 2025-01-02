import { MesasService } from 'src/app/services/mesas/mesas.service';
import { OrderService } from './../../services/order/order.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplementosService } from 'src/app/services/complementos/complementos.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.scss']
})
export class MeusPedidosComponent implements OnInit {
  @Output() mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  token: string;
  total = 0;
  
  constructor(
    private _snackBar: MatSnackBar,
    private complementoService: ComplementosService,
    private orderService: OrderService, private mesaService: MesasService,
    
  ) { }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token') || "";
    
  }

  async fazerPedido(){
    this.checkin();
    const dados = {
      restaurant: this.mesa.restaurant._id,
      table: this.mesa._id ,
      orderFood: this.mesa.cart,
      date: new Date(),
      status: "Aguardando confirmação...",
      active: true,
      
    }
    console.log(dados)
    this.orderService.create(dados).subscribe(res => {
      this._snackBar.open('Pedido feito!', "ok");  
    }, (error: any) =>{
      this._snackBar.open('Erro ao fazer pedido', "ok");  
    })
    const tamanho = this.mesa.cart.length;
    for (let i = 0; i < tamanho ; i++) {
      await this.remover(this.mesa._id, 0);
      
    }
  }
  async remover(id: string, index: number){
    this.mesa.cart.splice(index, 1);
    const result = await this.mesaService.deleteCart(id, index);
  }
  async editCart(id: string, index: number, valor: number){
    
    const result = await this.mesaService.editCart(id, index, valor);
  }
  irPara(){
    
    window.location.href = "#/entrar"
  }
  async checkin(){
    const dadosCheckin = {
      chegada: new Date(),
      name: window.localStorage.getItem('nome'),
      user: window.localStorage.getItem('user')
    }
 
    try {
      const result2 = await this.mesaService.checkin(this.mesa._id, dadosCheckin);
      this.mesaChange.emit(result2)
      

      
    } catch (error) {
      this._snackBar.open('Erro', "ok");
    }
  }
  calculaTotal(){
    this.total = 0;
    for (let i = 0; i < this.mesa.cart.length; i++) {
      let somaComplementos = this.calculaComplementos(this.mesa.cart[i]);

      console.log()
      this.total = this.total + (this.mesa.cart[i].quantidade*(this.mesa.cart[i].priceFood + somaComplementos))
      
    }
    return this.total;
  }
  calculaComplementos(cart: any){
    let somaComplementos = 0;
    for (let j = 0; j < cart.complementos.length; j++) {
      somaComplementos = somaComplementos + cart.complementos[j].quantidade * cart.complementos[j].price
      
    }
    return somaComplementos
  }
}
