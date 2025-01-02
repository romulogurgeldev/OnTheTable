import { ConfigService } from 'src/app/services/config/config.service';
import { ComidaService } from 'src/app/services/comida/comida.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PlanosService } from './../../services/planos/planos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';

@Component({
  selector: 'app-lista-restaurante',
  templateUrl: './lista-restaurante.component.html',
  styleUrls: ['./lista-restaurante.component.scss']
})
export class ListaRestauranteComponent implements OnInit {
  public restaurant: any;
  public myPlan: any;
  public idUsuario: any;
  public totalFood: any = [];
  public totalTable: any = [];
  public minhasConfig: any = []
  addRestaurante = false;
  constructor(
    private configService: ConfigService,
    private router: Router, 
    private comidaService: ComidaService,
    private mesaService: MesaService,
    private estabelecimentoService: EstabelecimentoService, 
    private loginService: LoginService,
    private planosService: PlanosService) { }

  ngOnInit(): void {
    let token = window.localStorage.getItem("token")
    this.idUsuario = this.loginService.getInfoUser(token);
    this.estabelecimentoService.getAllByUser().subscribe(res => {
      this.restaurant = res;
      for (let i = 0; i < this.restaurant.length; i++) {
        this.configService.getOneByRestaurant(this.restaurant[i]._id).subscribe((res: any) =>{
          console.log(res)
          this.minhasConfig.push(res)
          
        })
        this.comidaService.getAllByRestaurant(this.restaurant[i]._id).subscribe((res: any) => {
          this.totalFood.push(res.length);
        })
        this.mesaService.getAllByRestaurant(this.restaurant[i]._id).subscribe((res: any) => {
          this.totalTable.push(res.length);
        })
        
      }
      
    })
    this.planosService.getByUser(this.idUsuario.sub).subscribe((res: any ) => {
      this.myPlan = res;
      console.log(this.myPlan)
    })


  }
  irPara(rota: string, id: any){
    window.localStorage.setItem('idRestaurante', id)
    this.router.navigate([`${rota}/${id}`]);
  }

}
