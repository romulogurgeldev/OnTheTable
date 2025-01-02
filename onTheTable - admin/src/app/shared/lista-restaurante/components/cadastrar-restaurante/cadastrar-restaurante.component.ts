import { LoginService } from 'src/app/services/login/login.service';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-restaurante',
  templateUrl: './cadastrar-restaurante.component.html',
  styleUrls: ['./cadastrar-restaurante.component.scss']
})
export class CadastrarRestauranteComponent implements OnInit {
  @Output() addRestauranteChange = new EventEmitter<any>();
  @Input() addRestaurante: any;
  restaurant = {
    cnpj: "",
    name: "",
    razaoSocial: "",
    telephone: ""
  };
  cep: any;
  idUser: any;
  carregando = false;
  cepCompleto = false;
  constructor(
    private loginService: LoginService,
    private estabelecimentoService: EstabelecimentoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let token = window.localStorage.getItem('token')
    this.idUser = this.loginService.getInfoUser(token)
  }

  async save(){
    this.carregando = true;
    this.cep.telphone = this.restaurant.telephone;
    const dados = {
      userAdm: this.idUser.sub,
      name: this.restaurant.name,
      // foto: {nome: this.nome, key: resultImageRestaurant.key, location: resultImageRestaurant.Location},
      cnpj: this.restaurant.cnpj,
      razaoSocial: this.restaurant.razaoSocial,
      address: this.cep,
      employees:[]
    }
    try {
      const result = await this.estabelecimentoService.createEstabelecimento(dados);
      this._snackBar.open('Cadastrado com sucesso', "ok");

      this.carregando = false;
      
    } catch (error) {
      this._snackBar.open('Erro ao salvar', "ok");

      this.carregando = false;
    }
  }
  fechar(){
    this.addRestauranteChange.emit(false)
  }
}
