import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {
  abrir: any;
  mesa: any;
  order: any;
  reservas: any;
  mode = 0;
  mesas: any;
  constructor() { }

  ngOnInit(): void {
  }

}
