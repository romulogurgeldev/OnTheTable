import { FoodService } from './../../services/food/food.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;

  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;

  @Output() idMesaChange = new EventEmitter<any>();
  @Input() idMesa: any;
  @Output() promotionsChange = new EventEmitter<any>();
  @Input() promotions: any;

  comida: any;
  comidas: any;
  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getAllByCategory(this.categoria._id).subscribe(res =>{
      this.comidas = res;
      for (let i = 0; i < this.promotions.length; i++) {
        
        for (let j = 0; j < this.promotions[i].foods.length; j++) {
          for (let k = 0; k < this.comidas.length; k++) {
            if(this.comidas[k]._id ==  this.promotions[i].foods[j]._id){
              this.comidas[k].promotions = this.promotions[i];
            }

          }
          
        }
        
      }
      

    })
  }
  verificaPromotion(precoOriginal: any, promocao: any){
    
    if (promocao.typeDiscount == "porcento"){
      return (precoOriginal - (precoOriginal*(promocao.discountValue/100)))
    }
    else if (promocao.typeDiscount == "reais"){
      return (precoOriginal - promocao.discountValue)
    }
    else if (promocao.doubleFood==true){
      return (precoOriginal)
    }
    return precoOriginal;
  }
  tipoDesconto(promocao: any){
    if (promocao.typeDiscount == "porcento"){
      return `-${promocao.discountValue}%`
    }
    else if (promocao.typeDiscount == "reais"){
      return `-R$ ${promocao.discountValue}`
    }
    else if (promocao.doubleFood){
      return `1+1`
    }
    return '0%'
  }
}
