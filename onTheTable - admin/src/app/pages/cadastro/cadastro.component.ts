import { PlanosService } from './../../services/planos/planos.service';
import { ImageService } from './../../services/image/image.service';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

@Output() public email: string = '';  
@Output() public password: string = '';
@Output() public nome: string = '';  
@Output() public cpf: string = '';
@Output() public dataNascimento: Date = new Date();
@Output() public endereco = {
  address: "",
  complement: "",
  uf: "",
  cep: "",
  numberAddress: "",
  city: "",
  telphone: ""
}
@Output() public nomeRestaurante: string = '';  
@Output() public cnpj: string = '';
@Output() public razaoSocial = '';
@Output() public enderecoRestaurante = {
  address: "",
  complement: "",
  uf: "",
  cep: "",
  numberAddress: "",
  city: "",
  telphone: "",
  bairro: ""
};
planos: any;
imageUser: any;
imageRestaurant: any;
carregando = true;
public pagina = 1;
  // public imagem:any = "./assets/buttons/uploadBtn.png";
  // public statusImagem:any = false;
titulo = ['Informações de Login',  'Informações do restaurante', 'Responsável do restaurante', 'Endereço do restaurante', 'Escolha seu plano']

  
constructor(
    private planosService: PlanosService,
    private _snackBar: MatSnackBar,
    private imageService: ImageService,
    private router: Router, 
    private usuarioService: UsuarioService, 
    private loginService: LoginService, 
    private estabelecimentosService: EstabelecimentoService){
    this.carregando = false;
  }

  ngOnInit(): void {
    this.planosService.getAll().subscribe((res: any) => {
      this.planos = res;
    })
  }

  async cadastrar(item: any = null){
    console.log(this.enderecoRestaurante)
    this.carregando = true;
    // const resultImageUser = await this.imageService.create(this.imageUser);
    const dadosUser = {
      name: this.nome,
      // foto: {nome: this.nome, key: resultImageUser.key, location: resultImageUser.Location},
      foto: null,
      email: this.email,
      password: this.password,
      cpf: this.cpf,
      category:"adm",
      address: {telphone: this.endereco.telphone}
    }
    console.log(item)
    this.carregando = false;
    try {
      const resultUser = await this.usuarioService.createUsuario(dadosUser);
      // console.log(resultUser)
      // const resultImageRestaurant = await this.imageService.create(this.imageRestaurant);
      const dadosLogin ={
        email: this.email,
        password: this.password
      }
      const resultLogin = await this.loginService.login(dadosLogin);
      const idUser: any = await this.loginService.getInfoUser(window.localStorage.getItem('token'));
      console.log(idUser.sub)
      const dadosRestaurant = {
        userAdm: idUser.sub,
        name: this.nomeRestaurante,
        // foto: {nome: this.nome, key: resultImageRestaurant.key, location: resultImageRestaurant.Location},
        cnpj: this.cnpj,
        razaoSocial: this.razaoSocial,
        address: this.enderecoRestaurante,
        employees:[]
      }
      const dadosPlanos = {
        user: idUser.sub,
        plano: item._id,
        inicio: new Date(),
        formaPagamento: "dinheiro"
      }
      
      console.log(dadosRestaurant)
      const resultEstabelecimento = await this.estabelecimentosService.createEstabelecimento(dadosRestaurant);
      await this.planosService.create(dadosPlanos).subscribe((res => {
        this.carregando = false;
  
        window.location.reload()

      }));

    } catch (error) {
     
      // console.log(resultUser)
      // const resultImageRestaurant = await this.imageService.create(this.imageRestaurant);
      const dadosLogin ={
        email: this.email,
        password: this.password
      }
      const resultLogin = await this.loginService.login(dadosLogin);
      const idUser: any = await this.loginService.getInfoUser(window.localStorage.getItem('token'));
      // console.log(idUser.sub)
      const dadosRestaurant = {
        userAdm: idUser.sub,
        name: this.nomeRestaurante,
        // foto: {nome: this.nome, key: resultImageRestaurant.key, location: resultImageRestaurant.Location},
        cnpj: this.cnpj,
        razaoSocial: this.razaoSocial,
        address: this.enderecoRestaurante,
        employees:[]
      }
      const dadosPlanos = {
        user: idUser.sub,
        plano: item._id,
        inicio: new Date(),
        formaPagamento: "dinheiro"
      }
      const resultEstabelecimento = await this.estabelecimentosService.createEstabelecimento(dadosRestaurant);
      await this.planosService.create(dadosPlanos).subscribe((res => {
        this.carregando = false;
  
        window.location.reload()

      }));
  

    }

    
  }
  // filterItemsOfType(){
  //   return this.planos.filter(x => x.tipo == this.planoSelecionado);
  // }
  // onChange(newValue:any) {
  //   console.log(newValue);
  //   this.planoSelecionado = newValue;


  // }
 

}
