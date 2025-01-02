import { UserService } from './../../services/user/user.service';
import { MessagesService } from './../../services/messages/messages.service';
import { Component, OnInit } from '@angular/core';
import { MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  id: any;
  mesa: any;
  mensagens: any;
  msgEscrita: any;
  token: any;
  usuario: any
  msgId: any;
  constructor(
    private userService: UserService,
    private messagesService: MessagesService,
    private mesasService: MesasService) { }

  ngOnInit(): void {
    const url = window.location.href.split('/');
    this.id = url[url.length-1];
    this.token = window.localStorage.getItem('token')
    this.mesasService.getOneByCode(this.id).subscribe(res=>{
      const result: any = res;
      this.mesa = result;
      this.pegaMsg()
    })
    this.usuario = this.userService.getInfoUser(this.token);

  }
  async pegaMsg(){
    const result: any = await this.messagesService.getMsgAtivas(this.mesa._id);
    if (result){
      this.mensagens = result.msg;
      this.msgId = result._id
    }
    else{
      this.mensagens = [];
    }
    setTimeout(() => {
      this.pegaMsg();
    }, 5000)
  }
  enviarMensagem(){
    if (this.mensagens.length>0 && this.msgEscrita.length>0){
      const dados = {

        msg: {
          remetente: this.usuario.sub,
          msg: this.msgEscrita,
          date: new Date(),
          restaurante: false
        }
      }
      this.msgEscrita = ""
      this.messagesService.enviarMensagem(this.msgId, dados).subscribe(res =>{
        
        this.mesa.batepapo = res;
        this.pegaMsg();
      });
      
    }
    else if (this.mensagens.length==0 && this.msgEscrita.length>0){
      
      const dados = {
        restauranteLido: false,
        usuarioLido: true,
        restaurante: this.mesa.restaurant,
        usuario: this.token ? this.usuario.sub : "",
        mesa: this.mesa._id,
        msg:[{
          remetente: this.usuario.sub,
          msg: this.msgEscrita,
          date: new Date(),
          restaurante: false
        }],
  
      }
      this.msgEscrita = ""
      this.messagesService.create(dados).subscribe(res =>{
        console.log(res)
        
        this.mesa.batepapo = res;
        console.log(this.mensagens)
        this.pegaMsg();
      });
    }
  }
}
