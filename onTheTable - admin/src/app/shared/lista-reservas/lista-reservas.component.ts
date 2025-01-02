import { ReservasService } from './../../services/reservas/reservas.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.scss']
})
export class ListaReservasComponent implements OnInit {
  @Output() reservasChange = new EventEmitter<any>();
  @Input() reservas: any;
  @Output() mesasChange = new EventEmitter<any>();
  @Input() mesas: any;
  mesaEscolhida: any = [];
  constructor(
    private reservasService: ReservasService,
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < this.reservas.length; i++) {
      this.mesaEscolhida.push("")
    }
  }
  save(reservaEscolhida: string, mesa: string){
    const dados = {
      status: "Reserva confirmada",
      table: mesa
    }
    this.reservasService.edit(reservaEscolhida, dados).subscribe((res: any) => {
      console.log(res)
    })
  }
  cancelar(reservaEscolhida: string){
    const dados = {
      status: "Reserva cancelada pelo restaurante",

    }
    this.reservasService.edit(reservaEscolhida, dados).subscribe((res: any) => {
      console.log(res)
    })
  }

}
