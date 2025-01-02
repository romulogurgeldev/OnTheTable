import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mesas-config',
  templateUrl: './mesas-config.component.html',
  styleUrls: ['./mesas-config.component.scss']
})
export class MesasConfigComponent implements OnInit {

  tipo = 'mesa'
  abrir: any;
  categorias: any;
  categoria: any;
  mesas: any;
  mesa: any;
  produto: any;
  // 1 - criar espaço
  // 2 - editar espaço
  // 3 - criar mesa
  // 4 - ver mesa
  mode = 0;
  constructor() { }

  ngOnInit(): void {
  }

  abrirMenu(numeroMode: number){
    this.mode = numeroMode
    this.abrir = true;
  }
}
