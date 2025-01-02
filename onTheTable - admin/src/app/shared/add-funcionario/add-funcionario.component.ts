import { LoginService } from 'src/app/services/login/login.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-funcionario',
  templateUrl: './add-funcionario.component.html',
  styleUrls: ['./add-funcionario.component.scss']
})
export class AddFuncionarioComponent implements OnInit {
  @Output() modeChange = new EventEmitter<number>();
  @Input() mode: any;

  @Output() funcionariosChange = new EventEmitter<any>();
  @Input() funcionarios: any;

  @Input() semana = [true, true, true, true, true, false, false]
  @Input() cargo: any;
  @Input() restaurante: any;
  @Input() horaEntrada: any;
  @Input() horaSaida: any;
  @Input() email: any;
  @Input() password: any;
  @Input() nome: any;
  @Input() cpf: any;
  @Input() dataNascimento: any;
  @Input() pagina: number = 0;
  @Input() public endereco = {
    address: "",
    complement: "",
    uf: "",
    cep: "",
    numberAddress: "",
    city: "",
    telphone: ""
  }
  permissao = {
    pedidos: {permissao: true, mesas: true, cozinha: true},
    historico: { permissao: true, historico: true},
    ajustes: { permissao: true, mesa: true, cardapio: true, config: true, promotion: true},
    delivery: { permissao: true, delivery: true},
  }
  fraseAtual = ['Informações de Login', "Informações Pessoais", "Informações Profissionais", "Permissões", "Funcionário cadastrado com sucesso!"]
  idBoss: any;
  carregando = false;
 
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private loginService: LoginService,
        private router: Router){
     
    
  }

  ngOnInit(): void {
    this.idBoss = this.loginService.getInfoUser(window.localStorage.getItem('token'));
  }
  async save(){
    this.carregando = true;
    const dadosUser = {
      name: this.nome,
      foto:"teste",
      email: this.email,
      password: this.password,
      cpf: this.cpf,
      birthday: this.dataNascimento,
      address: this.endereco,
      category:"funcionario",
      semana: this.semana,
      cargo: this.cargo,
      horaSaida: this.horaSaida,
      horaEntrada: this.horaEntrada,
      userBoss: this.idBoss.sub,
      restaurant: this.restaurante,
      permissao: this.permissao
    }
    console.log(dadosUser)
    const resultUser = await this.usuarioService.createUsuario(dadosUser);
    this.usuarioService.getEmployees().subscribe(res => {
      this.funcionarios = res;
      this.funcionariosChange.emit(this.funcionarios);
      this.carregando = false;
    })


    this.pagina++;
  }
  fecharJanela(){
    this.modeChange.emit(0);
  }

 



}
