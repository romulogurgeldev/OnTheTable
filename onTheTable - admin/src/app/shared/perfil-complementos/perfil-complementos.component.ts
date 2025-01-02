import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-perfil-complementos',
  templateUrl: './perfil-complementos.component.html',
  styleUrls: ['./perfil-complementos.component.scss']
})
export class PerfilComplementosComponent implements OnInit {
  @Output() produtoChange = new EventEmitter<any>();
  @Input() produto: any;
  constructor() { }

  ngOnInit(): void {
  }

}
