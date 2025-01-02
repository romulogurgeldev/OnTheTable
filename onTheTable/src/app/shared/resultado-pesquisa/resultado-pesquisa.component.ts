import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resultado-pesquisa',
  templateUrl: './resultado-pesquisa.component.html',
  styleUrls: ['./resultado-pesquisa.component.scss']
})
export class ResultadoPesquisaComponent implements OnInit {
  @Output() produtosChange = new EventEmitter<any>();
  @Input() produtos: any;
  @Output() pesquisaChange = new EventEmitter<any>();
  @Input() pesquisa: any;
  @Output() idMesaChange = new EventEmitter<any>();
  @Input() idMesa: any;
  comida: any;
  constructor() { }

  ngOnInit(): void {
  }

}
