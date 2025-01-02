import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  abrir: any;
  pedido: any;
  mode: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
