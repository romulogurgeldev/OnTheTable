
import { MessagesService } from './../../services/messages/messages.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-batepapo',
  templateUrl: './batepapo.component.html',
  styleUrls: ['./batepapo.component.scss']
})
export class BatepapoComponent implements OnInit {
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;
  @Output() mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  mensagens: any = []
  msgEscrita: string = "";
  token: any;
  usuario: any;
  msgId: string = ""
  constructor(
    private loginService: LoginService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    console.log(this.mesa)
    this.token = window.localStorage.getItem('token')
    this.usuario = this.loginService.getInfoUser(this.token);
    this.pegaMensagens();
  }
  async pegaMensagens(){
    console.log(this.mesa.batepapo, this.mensagens)
    if(this.mesa.batepapo ){
      this.msgId = this.mesa.batepapo ? this.mesa.batepapo._id : ""
      this.visualizaMensagem()
      this.mesa.restauranteLido = true;
      this.mesaChange.emit(this.mesa)
      this.mensagens = this.mesa.batepapo.msg
      console.log(this.mensagens)
    }
    else{
      console.log('n tem bp')
    }

  

  }

  async enviarMensagem(){
    console.log(this.mensagens, this.msgEscrita.length)
    if (this.mensagens.length>0 && this.msgEscrita.length>0){
      console.log('edita', this.msgEscrita)
      const dados = {

        msg: {
          remetente: this.usuario.sub,
          msg: this.msgEscrita,
          date: new Date(),
          restaurante: true
        }
      }
      this.msgEscrita = ""
      this.messagesService.enviarMensagem(this.msgId, dados).subscribe(res =>{
        
        this.mesa.batepapo = res;
        this.pegaMensagens();
      });
      
    }
    else if (this.mensagens.length==0 && this.msgEscrita.length>0){
      console.log('cria')
      const dados = {
        restauranteLido: false,
        restaurante: this.mesa.restaurant,
        usuario: this.token ? this.usuario.sub : "",
        mesa: this.mesa._id,
        msg:[{
          remetente: this.usuario.sub,
          msg: this.msgEscrita,
          date: new Date(),
          restaurante: true
        }],
  
      }
      this.msgEscrita = ""
      this.messagesService.create(dados).subscribe(res =>{
        console.log(res)
        
        this.mesa.batepapo = res;
        console.log(this.mensagens)
        this.pegaMensagens();
      });
    }
  }
  visualizaMensagem(){
    const dados = {
      restauranteLido: true
    }
    this.messagesService.edit(this.msgId, dados).subscribe(res =>{
      console.log(res)  
    })
  }
  encerraMensagem(){
    
    const dados = {
      status: false
    }
    this.messagesService.edit(this.msgId, dados).subscribe(res =>{
      console.log(res)  
      this.mensagens = []
      this.mesa.batepapo = "";
      this.mesaChange.emit(this.mesa)
      this.modeChange.emit(0)
    })
  }
  fecharBatepapo(){
    this.modeChange.emit(0)
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('change')
    this.pegaMensagens();
  }

}
