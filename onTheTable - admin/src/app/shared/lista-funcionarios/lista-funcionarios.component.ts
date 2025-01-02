import { Component, HostListener, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-lista-funcionarios',
  templateUrl: './lista-funcionarios.component.html',
  styleUrls: ['./lista-funcionarios.component.scss']
})
export class ListaFuncionariosComponent implements OnInit {

  public mode = 0;
  public funcionarios: any;
  public funcionarioEscolhido: any;
  pesquisa = "";
  abrir: any
  abrir2: any
  // public funcionarioEscolhido = {
  //   cargo: "Caixa",
  //   horaEntrada: "01:00",
  //   horaSaida: "05:00",
  //   permissoes: "todas",
  //   restaurant: {
  //     cnpj: "12345/0001622",
  //     employees: ['62335f265484fec1c0d61734', '62335bcd1269d4e8e36fddc5', '624c3d7fabcb1cb13eb71838'],
  //     name: "Restaurante do Felipe",
  //     razaoSocial: "Restaurante SA",
  //     userAdm: "624c3d23abcb1cb13eb71824",
  //     __v: 0,
  //     _id: "624c3ff3abcb1cb13eb71847",
  //   },
  //   semana:  [true, true, true, true, true, false, false],
  //   user: {
  //     address:{
  //       address: "Avenida Independência",
  //       cep: "60353-165",
  //       city: "Fortaleza",
  //       complement: "de 1663 ao fim - lado ímpar",
  //       numberAddress: "1923",
  //       telphone: "85997837494",
  //       uf: "CE",
  //       _id: "6265e570c523b0a0d13bcb44",
  //     },
  //     birthday: "2022-04-24T03:00:00.000Z",
  //     category: "funcionario",
  //     cpf: "45555",
  //     email: "josinho@hotmail.com",
  //     foto: "teste",
  //     name: "Josinho Araujo",
  //     password: "123456",
  //     __v: 0,
  //     _id: "6265e570c523b0a0d13bcb43"
  //   },
  //   userBoss: "624c3d23abcb1cb13eb71824",
  //   __v: 0,
  //   _id: "6265e570c523b0a0d13bcb46"
  // };
  public tamanho = 6;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getEmployees().subscribe(res => {
      this.funcionarios = res;
    })
    this.tamanhoTela();
  }
  primeiroNome(nome: string){
    return nome = nome.split(' ')[0];
  }
  
  tamanhoTela(){
    if (window.screen.width <= 630 &&  window.screen.width >= 451) { // 768px portrait

      this.tamanho = 5;
    }
    else if (window.screen.width < 450) { // 768px portrait
 
      this.tamanho = 4;
    }
    else{
      this.tamanho = 6;

    }
  }
  escolheFuncionario(funcionario: any){
    console.log(funcionario)
    this.funcionarioEscolhido = funcionario;
  }
  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    // we will write this logic later
    this.tamanhoTela();
  }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);
    console.log(this.pesquisa)
  }
  
}
