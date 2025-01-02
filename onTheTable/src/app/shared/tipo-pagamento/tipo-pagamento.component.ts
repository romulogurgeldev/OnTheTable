import { ConfigService } from './../../services/config/config.service';
import { MesasService } from './../../services/mesas/mesas.service';
import { UserService } from './../../services/user/user.service';
import { MessagesService } from './../../services/messages/messages.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tipo-pagamento',
  templateUrl: './tipo-pagamento.component.html',
  styleUrls: ['./tipo-pagamento.component.scss']
})
export class TipoPagamentoComponent implements OnInit {
  @Output() pagamentoChange = new EventEmitter<any>();
  @Input() pagamento: any;
  @Output() idMesaChange = new EventEmitter<any>();
  @Input() idMesa: any;
  presencial = false;
  online = false;
  cadastro = false;
  token: any;
  user: any;
  idRestaurante: any;
  configRestaurante: any
  constructor(
    private configService: ConfigService,
    private mesasService: MesasService,
    private userService: UserService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    if( window.localStorage.getItem('token')){
      this.cadastro = true;
    }
    this.token = window.localStorage.getItem("token")
    this.user = this.userService.getInfoUser(this.token)
    console.log(this.idMesa)
    this.mesasService.getOne(this.idMesa).subscribe((res: any) =>{
      this.idRestaurante = res.restaurant._id;
      this.configService.getOneByRestaurant(this.idRestaurante).subscribe((res: any) =>{
        this.configRestaurante = res;
      }, (error: any) => {
        console.log(error)
      })
    })
  }
  fechar(){
    this.pagamentoChange.emit(false);
  }
  irPara(){
    window.location.href = "#/login"
  }
  async mandaMsg(){
    const dados = {
      restaurante: this.idRestaurante,
      usuario: this.token ? this.user.sub : "",
      mesa: this.idMesa,
      msg:[{
              remetente: this.token ? this.user.sub : "",
              msg: "Quero pagar minha conta, por favor.",
              date: new Date(),
              restaurante: false
          }],

    }
    const result: any= await this.messagesService.getMsgAtivas(this.idMesa)
    console.log(dados)
    if (result){
      const msg = {
        msg: {
          remetente: this.token ? this.user.sub : "",
          msg: "Quero pagar minha conta, por favor.",
          date: new Date(),
          restaurante: false
        }
      }
      this.messagesService.enviarMensagem(result._id, msg).subscribe(res=>{

      })
    }
    else{
      this.messagesService.create(dados).subscribe(res =>{

      })
    }



  }
}
