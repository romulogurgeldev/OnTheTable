import { MesasService } from 'src/app/services/mesas/mesas.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReservasService } from './../../services/reservas/reservas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservar-home',
  templateUrl: './reservar-home.component.html',
  styleUrls: ['./reservar-home.component.scss']
})
export class ReservarHomeComponent implements OnInit {
  token: any;
  user: any;
  reservas: any;
  idRestaurante: any
  idMesa: any
  constructor(
    private mesasService: MesasService,
    private reservasService: ReservasService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token');
    this.user = this.userService.getInfoUser(this.token)
    const url = window.location.href.split('/');
    this.idMesa = window.localStorage.getItem('mesa')
    this.mesasService.getOne(this.idMesa).subscribe((res: any) => {
      console.log(res)
      this.idRestaurante = res.restaurant._id;
      
    })
    this.reservasService.getAllByUser(this.user.sub).subscribe((res: any) => {
      this.reservas = res;
      console.log(this.reservas)
    })
  }

}
