import { RestaurantService } from './../../services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.scss']
})
export class ReservarComponent implements OnInit {
  idRestaurante: any;
  restaurante: any
  constructor(
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    const url = window.location.href.split('/');
    this.idRestaurante = url[url.length-1];
    this.restaurantService.getById(this.idRestaurante).subscribe((res: any) =>{
      this.restaurante = res;
      console.log(this.restaurante)
    })
  }

}
