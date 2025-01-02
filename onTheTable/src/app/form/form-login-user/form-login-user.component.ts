import { MesasService } from 'src/app/services/mesas/mesas.service';
import { TelefoneService } from './../../services/telefone/telefone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-form-login-user',
  templateUrl: './form-login-user.component.html',
  styleUrls: ['./form-login-user.component.scss']
})
export class FormLoginUserComponent implements OnInit {
  @Output() cadastroChange = new EventEmitter<any>();
  @Input() cadastro: any;
  @Output() logadoChange = new EventEmitter<any>();
  @Input() logado: any;
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;
  public hide = true;
  public form : FormGroup;
  code: boolean;
  carregando = true;
  entrarEmail = true;
  codigoTelefone: any;
  paisEscolhido = 55;
  mask = "(00) 0 0000-0000"
  url: string = ""
  constructor(
    private orderService: OrderService,
    private _location: Location,
    private mesasService: MesasService,
    private router: Router,
    private codTelefone: TelefoneService, 
    private fb: FormBuilder, 
    private userService: UserService,
    private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
        


      ])],
      email: ['', Validators.compose([
        Validators.required,
        


      ])],
      cpf: ['', Validators.compose([
        Validators.required,
        


      ])],
      telefone: ['', Validators.compose([
        Validators.required,
        


      ])],
      code: ['', Validators.compose([
        Validators.required,
        


      ])],
      
    })
    
    this.carregando = false;
   }

  ngOnInit(): void {
    this.codigoTelefone = this.codTelefone.getCodigoTelefone(); 
    this.url = this.router.url;

  }

  async checkin(){
    this.carregando = true;
    const dados = {
      email: this.form.controls['email'].value,
      telefone: `+${this.paisEscolhido}${this.form.controls['telefone'].value}`,
    }
    window.localStorage.setItem('user', dados.telefone);
    if (dados.email) window.localStorage.setItem('user', dados.email);
    console.log(dados)
    
    this.carregando = false;
    this.code = true;
    const result = await this.userService.loginCliente(dados);
  }
  async login(){
    this.carregando = true;
    const dados = {
      email: window.localStorage.getItem('user'),

      password: this.form.controls['code'].value,

    }

    // try {
    //   const result = await this.mesasService.checkin(this.mesa._id, dados);
    //   window.localStorage.setItem('nome', dados.name);
    //   window.localStorage.setItem('telefone', dados.telefone);
    //   this.logadoChange.emit(true);
    //   this._snackBar.open('Bom apetite!', "ok");
    // } catch (error) {
    //   this._snackBar.open('Erro desconhecido', "ok");
    // }
    console.log(dados)
    try {
      const result = await this.userService.login(dados)
      const dadosCheckin = {
        chegada: new Date(),
        name: window.localStorage.getItem('nome'),
        user: window.localStorage.getItem('user')
      }
      const idMesa: any = window.localStorage.getItem('mesa');
      const result2 = await this.mesasService.checkin(idMesa, dadosCheckin);
      if (this.url =='/entrar'){
        this.mesasService.getOne(idMesa).subscribe(async (res: any)=>{
          const dados = {
            restaurant: res.restaurant._id,
            table: res._id ,
            orderFood: res.cart,
            date: new Date(),
            status: "Aguardando confirmação...",
            active: true,
            
          }
          this.orderService.create(dados).subscribe(res2 => {
            console.log(res2)

            this.backClicked();
          })
          const tamanho = res.cart.length;
          for (let i = 0; i < tamanho ; i++) {
            await this.remover(idMesa, 0);
            
          }
        });

      }
      else{
          
        this.logadoChange.emit(true);
        this._snackBar.open('Bom apetite!', "ok");
        this.carregando = false;
        this.backClicked();
      }

      

    } catch (error) {
      this.carregando = false;
      alert("código não confere")


    }

  }
  async remover(id: string, index: number){

    const result = await this.mesasService.deleteCart(id, index);
  }
  trocaMascara(){

    this.mask = "000000000000000"
    if (this.paisEscolhido == 55){
      this.mask = "(00) 0 0000-00000000"
    }

  }
  fechar(){
    this.modeChange.emit(false)
  }
  backClicked() {
    console.log('bolts')
    this._location.back();
  }
}
