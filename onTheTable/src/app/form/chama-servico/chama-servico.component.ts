import { MessagesService } from './../../services/messages/messages.service';
import { UserService } from './../../services/user/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-chama-servico',
  templateUrl: './chama-servico.component.html',
  styleUrls: ['./chama-servico.component.scss']
})
export class ChamaServicoComponent implements OnInit {
  @Output() idMesaChange = new EventEmitter<any>();
  @Input() idMesa: any;
  @Output() servicoChange = new EventEmitter<any>();
  @Input() servico: any;
  public form : FormGroup;
  escolha = false;
  opcoes = ['Fazer pedido', "Preciso de talher", "Preciso de prato", "Traga guardanapos", "Preciso de copo", "Traga a conta"];
  valores = ["","","","","",""];
  idUser: any;
  token: any;
  idRestaurante: any;
  
  constructor(
    private messagesService: MessagesService,
    private userService: UserService,
    private fb: FormBuilder, 
    private mesasService: MesasService, 
    private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      outros: ['', Validators.compose([
        Validators.required,
        


      ])]
    })
   }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token');
    this.idUser = this.userService.getInfoUser(this.token);
    console.log(this.idMesa)
    this.mesasService.getOne(this.idMesa).subscribe((res: any) => {
      this.idRestaurante = res.restaurant._id;
      console.log(this.idRestaurante)
    })
  }

  async checkin(){
    let mensagem = "";
    for (let i = 0; i < this.valores.length; i++) {
      console.log(this.valores[i])
      if (this.valores[i]){
        mensagem = mensagem+this.valores[i]+"<br>"
      }

      
    }
    mensagem = mensagem+this.form.controls['outros'].value
    const dados = {
      restaurante: this.idRestaurante,
      usuario: this.token ? this.idUser.sub : "",
      mesa: this.idMesa,
      msg:[{
              remetente: this.token ? this.idUser.sub : "",
              msg: mensagem,
              date: new Date(),
              restaurante: false
          }],

    }
    const result: any= await this.messagesService.getMsgAtivas(this.idMesa)
    console.log(dados)
    if (result){
      const msg = {
        msg: {
          remetente: this.token ? this.idUser.sub : "",
          msg: mensagem,
          date: new Date(),
          restaurante: false
        }
      }
      this.messagesService.enviarMensagem(result._id, msg).subscribe(res=>{
        this._snackBar.open('Seu pedido foi enviado!', "ok");
        this.servicoChange.emit(false)
      })
    }
    else{
      this.messagesService.create(dados).subscribe(res =>{
        this._snackBar.open('Seu pedido foi enviado!', "ok");
        this.servicoChange.emit(false)
      })
    }



  }
  seleciona(e: any, index: number){
    if (e){
      this.valores[index] = this.opcoes[index];
      this.escolha = true;
    }
    else{
      this.valores[index] = "";
      this.escolha = false
    }

  }
  fechar(){
    this.servicoChange.emit(false);
  }

}
