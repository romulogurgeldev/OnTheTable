import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nao-logado-header',
  templateUrl: './nao-logado-header.component.html',
  styleUrls: ['./nao-logado-header.component.scss']
})
export class NaoLogadoHeaderComponent implements OnInit {
  @Output() mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  @Output() pesquisaChange = new EventEmitter<any>();
  @Input() pesquisa: any;
  constructor() { }

  ngOnInit(): void {
  }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);
    this.pesquisaChange.emit(this.pesquisa)
  }
  onScroll() {
    console.log('scroll')

  }

}
