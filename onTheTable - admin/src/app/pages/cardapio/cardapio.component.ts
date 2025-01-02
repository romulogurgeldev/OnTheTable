import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {
  tipo = 'comida'
  abrir: any;
  categoria: any;
  categorias: any;
  produto: any;
  // 1 - criar categoria
  // 2 - editar categoria
  // 3 - criar ccomida
  // 4 - ver detalhes comida
  // 5 - editar comida
  mode = 0;
  constructor() { }

  ngOnInit(): void {
  }

  abrirMenu(numeroMode: number){
    this.mode = numeroMode
    this.abrir = true;
  }
}
