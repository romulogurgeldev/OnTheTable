import { SalesService } from './../../services/sales/sales.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { OrderService } from './../../services/orders/order.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fechar-pedido',
  templateUrl: './fechar-pedido.component.html',
  styleUrls: ['./fechar-pedido.component.scss']
})
export class FecharPedidoComponent implements OnInit {
  @Output() mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  @Output() idChange = new EventEmitter<any>();
  @Input() id: any;
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;

  pedido: any;
  gorjeta = 10;
  desconto = 0;
  subtotal = 0;
  total = 0;
  formaPagamento: any = "dinheiro";
  carregando = true;
  finalizado = false;
  parcial = false;
  valorParcial = 0;
  valorJaPago = 0;
  constructor(
    private salesService: SalesService,
    private orderService: OrderService, 
    private mesaService: MesaService) { }

  ngOnInit(): void {
    console.log(this.id)
    this.orderService.getOneActive(this.id).subscribe(result => {
      this.pedido = result;
      this.valorJaPago = this.pedido[0].amountPaid!=null ? this.pedido[0].amountPaid : 0
      console.log(this.pedido)
      this.carregando = false;
      this.calculaTotal();
    })
  }
  changeGorjeta(event: any){
    this.gorjeta = event.value;
    this.calculaTotal();
  }
  changeDesconto(event: any){
    this.desconto = event.value;
    this.calculaTotal();
  }
  calculaTotal(){
    this.subtotal = 0;
    for (let i = 0; i < this.pedido.length; i++) {
      this.subtotal = this.subtotal + this.pedido[i].originalPrice;
      
    }
    this.total = ((this.gorjeta/100)*this.subtotal)+this.subtotal;
    this.total = this.total-(this.desconto/100*this.total)
    this.total = this.total - this.valorJaPago
    this.valorParcial = this.total
  }
  async fecharPedido(){
    this.carregando = true; 
    let dados: any = {
      restaurant: this.pedido[0].restaurant,
      table: this.pedido[0].table,
      discount: this.desconto>0,
      discountValue: this.desconto,
      amountPaid: this.total,
      formPayment: this.formaPagamento,
      date: new Date(),
      parcial: false
    }
    console.log(dados)

    let pagamento = {

      amountPaid: this.valorParcial,

    }
    let table = {

      chegada: null,
      participantes: [],
      cart: []
    }
    const pedidoFechado: any = await this.orderService.fecharPedido(dados);
    dados.orderFood = [""]
    let dados2 = {
      active: false,
      status: "Pedido finalizado",
      dateFinalizado: new Date(),
      orderTable: pedidoFechado._id
    }
    for (let i = 0; i < this.pedido.length; i++) {
      if (i==0){
        dados.orderFood[0] = this.pedido[i]._id;
        console.log(this.pedido[i])
      }
      else{
        dados.orderFood.push(this.pedido[i]._id);
        console.log(this.pedido[i])

      }

      await this.SaveHistory(this.pedido[i])
      this.carregando = false;

      
      this.orderService.editStatus(this.pedido[i]._id, dados2).subscribe( res =>{

      })
      
      
    }
    console.log(dados)
    await this.orderService.editaPedido(pedidoFechado._id, dados);
    this.carregando = false;
    this.finalizado = true;
    const result = await this.mesaService.edit(this.pedido[0].table, table);
    console.log(result)

  }
  reload(){
    window.location.reload();
  }
  fechar(){
    this.modeChange.emit(0);
  }

  async fecharPedidoParcial(){
    let dados = {
      restaurant: this.pedido[0].restaurant,
      table: this.pedido[0].table,
      orderFood: [""],
      discount: this.desconto>0,
      discountValue: this.desconto,
      amountPaid: this.valorParcial,
      formPayment: this.formaPagamento,
      date: new Date(),
      parcial: false
    }
    let pagamento = {

      amountPaid: this.valorParcial,

    }
    for (let i = 0; i < this.pedido.length; i++) {
      if (i==0){
        dados.orderFood[0]=this.pedido[i]._id;
      }
      else{
        dados.orderFood.push(this.pedido[i]._id);

      }
      this.orderService.editStatus(this.pedido[i]._id, pagamento).subscribe( res2 =>{
        console.log(res2)
      })
      
    }
    await this.orderService.fecharPedido(dados)
  }

  async SaveHistory(food: any){
    let data = new Date();
    data.setHours(0, 0, 0, 0);
    
    console.log(data, food)
    let dados = {
      restaurant: this.pedido[0].restaurant,
      table: this.pedido[0].table,
      food: "",
      date: data,
      quantidade: 0,
      price: 0,
    }
    for (let i = 0; i < food.orderFood.length; i++) {
      dados.food = food.orderFood[i].food;
      dados.quantidade = food.orderFood[i].quantidade;
      dados.price = food.orderFood[i].priceFood * dados.quantidade;
      const result = await this.salesService.create(dados);
      console.log(result);
    }
    console.log(dados)

  }
}
