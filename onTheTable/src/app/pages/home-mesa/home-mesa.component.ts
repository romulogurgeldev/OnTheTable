import { ConfigService } from './../../services/config/config.service';
import { PromotionsService } from './../../services/promotions/promotions.service';
import { UserService } from 'src/app/services/user/user.service';
import { FoodService } from './../../services/food/food.service';

import { MesasService } from './../../services/mesas/mesas.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-home-mesa',
  templateUrl: './home-mesa.component.html',
  styleUrls: ['./home-mesa.component.scss']
})
export class HomeMesaComponent implements OnInit {
  mode = 1;
  mode2 = 2;
  mesa: any;
  categoria: any;
  food: any;
  carregando = true;
  logado = false;
  pesquisa: any;
  produtos: any;
  promotions: any;
  configRestaurant: any;
  servico = false;
  pagamento = false;
  escolhida: any = "todas";
  fixed = false;
  branco = true;
  constructor(
    private configService: ConfigService,
    private promotionsService: PromotionsService,
    private foodService: FoodService,
    private categoryService: CategoryService,
    private mesasService: MesasService, 
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.mesasService.getOneByCode(id).subscribe(res =>{
        this.mesa = res;
        window.localStorage.setItem("mesa", this.mesa._id)
        this.categoryService.getAllByRestaurant(this.mesa.restaurant._id, 'comida').subscribe(result =>{
          this.categoria = result;
          

        })
        this.foodService.getAllByRestaurant(this.mesa.restaurant._id).subscribe(res =>{
          this.produtos = res;
          console.log(this.produtos)
        })
        this.promotionsService.getAllByRestaurant(this.mesa.restaurant._id).subscribe(res=>{
          this.promotions = res;
        })
        this.configService.getOneByRestaurant(this.mesa.restaurant._id).subscribe(res=>{
          this.configRestaurant = res;
        })
        this.carregando = false;  
       
      }, err => {
        console.log(err)
        alert(err.message);
        window.location.href = '#/home'
      })

    });

  }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);
    
  }
  @HostListener('window:scroll', ['$event']) onScroll() {
    if(window.scrollY>120){
      
      this.fixed  = true;
    }
    else{
      
      this.fixed  = false;
    }

  }

}
