import { ReservasService } from './../../services/reservas/reservas.service';
import { MessagesService } from './../../services/messages/messages.service';
import { OrderService } from './../../services/orders/order.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.scss']
})
export class ListaMesasComponent implements OnInit {
  @Output() abrirChange = new EventEmitter<any>();
  @Input() abrir: any;
  @Output()mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  @Output()mesasChange = new EventEmitter<any>();
  @Input() mesas: any;
  @Output() orderChange = new EventEmitter<any>();
  @Input() order: any;
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;
  @Output() reservasChange = new EventEmitter<any>();
  @Input() reservas: any;
  categorias: any;
  escolhido = "todas";
  mesaEscolhida: any;
  numeroDeSolicitacao: any = 0;
  idRestaurante: any;
  CLOCK: any;

  constructor(
    private reservasService: ReservasService,
    private messagesService: MessagesService,
    private categoriaService: CategoriaService, 
    private mesaService: MesaService, 
    private orderService: OrderService) { }
  
  ngOnInit(): void {
    this.idRestaurante = window.localStorage.getItem('idRestaurante')
    this.categoriaService.getAllByRestaurant("mesa").subscribe(res => {
      this.categorias = res;
      this.pegaMesa();
    })
  }
  async pegaMesa(id ="sem", ordem = 1, title = "name", index = 0){
    clearTimeout(this.CLOCK)
    if (this.escolhido=="todas"){
      this.mesaService.getAllByRestaurant(this.idRestaurante, 10, index, ordem, title).subscribe(async (res: any) =>{
        this.mesas = res;
        for (let i = 0; i < this.mesas.length; i++) {
          const result: any = await this.messagesService.getMsgAtivas(this.mesas[i]._id);
          if (result){
            this.mesas[i].temMsg = result.restauranteLido==false ? true : false;
            this.mesas[i].batepapo = result;
          }
          
          
        }
        if (!this.mesaEscolhida) this.mesaEscolhida = this.mesas[0]

        this.pegaOrder();
        this.CLOCK = setTimeout(() => {
          this.pegaMesa();
        }, 8000)
      })
      this.reservasService.getAllByRestaurante().subscribe((res: any)=>{
        this.reservas = res;
        for (let i = 0; i < res.length; i++) {
          if(res[i].status=="Aguardando confirmação"){
            this.numeroDeSolicitacao = this.numeroDeSolicitacao + 1;
          }
          
        }
      })
    }
    else{
      this.mesaService.getAllByCategory(id, 10, 0, ordem, title).subscribe(async result =>{
        this.mesas = result;

        this.pegaOrder();
        this.CLOCK = setTimeout(() => {
          this.pegaMesa(id, ordem, title, index);
        }, 8000)


      })
    }

  }
  pegaOrder(){
    for (let i = 0; i < this.mesas.length; i++) {
      if (this.mesas[i].participantes.length>0){
        this.orderService.getOneActive(this.mesas[i]._id).subscribe(result =>{
   
          const res: any = result;

          this.mesas[i].statusOrder = res[0]==undefined ? "Não fez pedido" : res[0].status;

        })
      }
      
    }

  }
  abreMesa(mesaEscolhida: any){
    this.mesaChange.emit(mesaEscolhida);
    
    this.mesa = mesaEscolhida;
    for (let i = 0; i < this.mesas.length; i++) {
      this.mesas[i].ativo = false;
     
    }
    this.pegaPedidos();

  }
  abreSolicitacao(){
    
    this.abrirChange.emit(true);
    this.modeChange.emit(2)
    this.reservasChange.emit(this.reservas)
    this.mesasChange.emit(this.mesas)
  }
  pegaPedidos(){
    this.orderService.getOneActive(this.mesa._id).subscribe(result => {
      
      this.orderChange.emit(result);
      this.abrirChange.emit(true);
      this.modeChange.emit(1)

    })
  }
}
