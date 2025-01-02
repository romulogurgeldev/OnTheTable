import { PromotionService } from './../../services/promotion/promotion.service';
import { ComidaService } from 'src/app/services/comida/comida.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-produtos-promocoes',
  templateUrl: './lista-produtos-promocoes.component.html',
  styleUrls: ['./lista-produtos-promocoes.component.scss']
})
export class ListaProdutosPromocoesComponent implements OnInit {
  @Output() productsChange = new EventEmitter<string>();
  @Input() products: any;
  pesquisa: any;
  comidas: any;
  constructor(
    private comidaService: ComidaService,
    private promotionService: PromotionService
  ) { }

  ngOnInit(): void {
    console.log(this.products)
    this.comidaService.getAllByRestaurant().subscribe(result =>{
      this.comidas = result;
      console.log(this.comidas)

    })
  }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);

  }
  temFood(idFood: string){
    let item;
    for (item of this.products.foods) {
      if(item._id == idFood){
        

        return true
      }
    
    }
    return false;
  }
  async removeFood(id: string){
    let item;
    let index = 0;
    for (item of this.products.foods) {
      if(item._id == id){
        this.products.foods.splice(index, 1);

        await this.refreshPromotion();
      }
      index++;
    }
  }
  async addFood(item: any){
    this.products.foods.push(item);
    await this.refreshPromotion();
  }
  async refreshPromotion(){
    await this.promotionService.edit(this.products._id, this.products)
  }
}
