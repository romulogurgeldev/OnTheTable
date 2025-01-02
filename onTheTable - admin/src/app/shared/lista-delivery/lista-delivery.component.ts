import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-delivery',
  templateUrl: './lista-delivery.component.html',
  styleUrls: ['./lista-delivery.component.scss']
})
export class ListaDeliveryComponent implements OnInit {
  ativo= true;
  @Input() abrir: any;
  @Output() abrirChange = new EventEmitter<any>();
  infoDelivery = false;
  constructor() { }

  ngOnInit(): void {
  }
  abreMenu(){
    this.infoDelivery = true;
    this.abrirChange.emit(true);
  }

}
