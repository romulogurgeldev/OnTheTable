import { PromotionService } from './../../services/promotion/promotion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promocoes',
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.scss']
})
export class PromocoesComponent implements OnInit {
  abrir: any;
  mode = 1;
  promotions: any;
  products: any;
  pesquisa: any;
  constructor(
    private promotionService: PromotionService
  ) { }

  ngOnInit(): void {
    this.promotionService.getAllByRestaurant().subscribe( (res: any) =>{
      this.promotions = res;
      console.log(this.promotions)
    })
  }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);

  }


}
