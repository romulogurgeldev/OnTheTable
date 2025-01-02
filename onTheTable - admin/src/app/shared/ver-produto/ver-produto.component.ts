import { ComidaService } from './../../services/comida/comida.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ver-produto',
  templateUrl: './ver-produto.component.html',
  styleUrls: ['./ver-produto.component.scss']
})
export class VerProdutoComponent implements OnInit {

  @Output() produtoChange = new EventEmitter<any>();
  @Input() produto: any;

  categoria = "bebidas";
  addComplemento = false;

  constructor(private comidaService: ComidaService) { }

  ngOnInit(): void {
  }

  async disponibilidade(event: any){
    this.produto.available = !this.produto.available
    const result = await this.comidaService.edit(this.produto._id, this.produto);
    console.log(result)
  }


}
