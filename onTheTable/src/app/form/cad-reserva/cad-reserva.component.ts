import { UserService } from './../../services/user/user.service';
import { ReservasService } from './../../services/reservas/reservas.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cad-reserva',
  templateUrl: './cad-reserva.component.html',
  styleUrls: ['./cad-reserva.component.scss']
})
export class CadReservaComponent implements OnInit {
  @Output() restauranteChange = new EventEmitter<any>();
  @Input() restaurante: any;
  today: Date;
  twoWeeks: Date;
  minHoras = "18:00";
  maxHoras = "18:00";
  horas: any = "18:00";
  token: any;
  user: any;
  sucesso = false;

  nomeUser: any = ""
  telefoneUser: string = ""
  dataEscolhida: string = "";
  carregando = false;
  quantosLugares = 1;
  constructor(
    private reservasService: ReservasService,
    private userService: UserService
  ) { 
    this.today = new Date();
    this.twoWeeks = this.addWeeks(2);
    
  }

  ngOnInit(): void {
    this.nomeUser = window.localStorage.getItem('nome')
    this.token = window.localStorage.getItem('token');
    this.user = this.userService.getInfoUser(this.token);
  }

  addWeeks(numOfWeeks: number, date = new Date()) {
    date.setDate(date.getDate() + numOfWeeks * 7);
  
    return date;
  }
  checktimeval(){


  }
  reservar(){
    this.carregando = true;
    const date = new Date(this.dataEscolhida);
    date.setDate(date.getDate()+1);
    console.log(date, this.horas)
    date.setHours(0);
    let horasTemporaria = this.horas.split(":");
    date.setHours(parseInt(horasTemporaria[0]))
    date.setMinutes(parseInt(horasTemporaria[1]))
    console.log(date)
    const dados = {
      restaurant: this.restaurante._id,
      user: this.user.sub,
      clientName: this.nomeUser,
      clientTelephone: this.telefoneUser,
      date: date,

    }
    this.reservasService.create(dados).subscribe(res =>{
      console.log(res)
      this.nomeUser = window.localStorage.getItem('nome');
      this.telefoneUser = "";
      this.dataEscolhida = ""
      this.sucesso = true;
      this.carregando = false;
    })
  }
  
}
