import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss']
})
export class ListaCategoriasComponent implements OnInit {
  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;
  @Output() escolhidaChange = new EventEmitter<any>();
  @Input() escolhida: any;
  @Output() corChange = new EventEmitter<any>();
  @Input() cor: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.categoria[0].name)
  }
  escolheCategoria(categoriaEscolhida: string){
    this.escolhidaChange.emit(categoriaEscolhida)

  }

}
