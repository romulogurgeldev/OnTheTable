import { MessagesService } from './../../services/messages/messages.service';
import { OrderService } from './../../services/orders/order.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-perfil-mesa-pedido',
  templateUrl: './perfil-mesa-pedido.component.html',
  styleUrls: ['./perfil-mesa-pedido.component.scss']
})
export class PerfilMesaPedidoComponent implements OnInit {
  @Output()mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  @Output()orderChange = new EventEmitter<any>();
  @Input() order: any;
  mode = 0;
  temMsg = false;

  constructor(
    private messagesService: MessagesService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    console.log(this.mesa)
    this.verificaSeTemMensagem();

  }
  changeStatusPedido(item: any, status: string){
    item.active = status=="Pedido cancelado" ? false : true;
    item.status = status;
    if (status=="Pedido cancelado"){
      item.dateCancelado = new Date();
    }
    else if (status=="Pedido entregue"){
      item.dateEntregue = new Date();
    }

    this.orderService.editStatus(item._id, item).subscribe(res=>{
      
    })
  }
  editPedido(id: string, dados: any){
    this.orderService.editStatus(id, dados).subscribe(res=>{
      console.log(res)
    })
  }

  excluiProduto(id: string, dados: any, index: number){

    dados.orderFood.splice(index, 1);
    this.orderService.editStatus(id, dados).subscribe(res=>{
      console.log(res)
    })
  }

  async verificaSeTemMensagem(){
    const result = this.mesa.batepapo;
    console.log(result)
    this.temMsg = false;
    if (result){
      for (let i = 0; i < result.length; i++) {
        this.temMsg = result[i].restauranteLido==false ? true : false
        console.log(this.temMsg)
        
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    this.mode = 0;
    this.verificaSeTemMensagem()
  }


}
