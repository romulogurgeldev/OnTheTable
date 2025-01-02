import { OrderService } from 'src/app/services/orders/order.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { LoginService } from './../../services/login/login.service';
import { PlanosService } from './../../services/planos/planos.service';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-config-gerais',
  templateUrl: './config-gerais.component.html',
  styleUrls: ['./config-gerais.component.scss']
})
export class ConfigGeraisComponent implements OnInit {
  abrir: any;
  config: any;
  plano: any
  planos: any
  editar = false;
  totalTables = 0;
  totalRestaurants = 0;
  totalOrders = 0;
  changePlan = false;
  constructor(
    private loginService: LoginService,
    private planosService: PlanosService,
    private estabelecimentoService: EstabelecimentoService,
    private mesasService: MesaService,
    private orderService: OrderService,
    private configService: ConfigService) { }

  ngOnInit(): void { 
    let token: any = window.localStorage.getItem('token')
    let user: any = this.loginService.getInfoUser(token);
    let idRestaurante: any = window.localStorage.getItem("idRestaurante")
    this.configService.getOneByRestaurant(idRestaurante).subscribe(res => {
      this.config = res;
    })
    this.planosService.getByUser(user.sub).subscribe(res => {
      this.plano = res;
      
      this.planosService.getAll().subscribe(res => {
        this.planos = res;
        
        for (let i = 0; i < this.planos.length; i++) {
          console.log(this.planos[i]._id, this.plano._id)
          if (this.planos[i]._id == this.plano.plano._id){
            this.planos.splice(i, 1);
          }
          
        }
      })
    })
    this.estabelecimentoService.getAllByUser().subscribe((res: any) => {
      this.totalRestaurants = res.length;
    })
    this.mesasService.getAllByRestaurant().subscribe((res: any) => {
      this.totalTables = res.length
    })
    this.orderService.getAll(6).subscribe((res: any) => {
      this.totalOrders = res.length
    })
  }
  async save(event: any){

    const result = await this.configService.edit(this.config._id, this.config);
    
  }
  irPara(){
    window.location.href="#/home"
  }
  calculaRestante(){
    let result: Date = new Date (this.plano.inicio);

    result.setDate(result.getDate()+(this.plano.quantidade))
    let hoje = new Date()

    var timeDiff = result.getTime() - hoje.getTime();
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays >= 0 ? "Dias restantes: "+diffDays : "Atraso: esperando pagamento";
  }
  renovarPlano(){
    const dados = {
      inicio: new Date(),
      formaPagamento: "cartao",
      quantidade: this.plano.quantidade + this.plano.plano.period
    }
    this.planosService.edit(this.plano._id, dados).subscribe((res: any) => {
      window.location.reload();
    }, (error: any) => {

    })

  }
  changePlano(newPlano: any){
    const dados = {
      inicio: new Date(),
      formaPagamento: "cartao",
      quantidade: this.plano.quantidade + newPlano.period,
      plano: newPlano._id
    }
    this.planosService.edit(this.plano._id, dados).subscribe((res: any) => {
      window.location.reload();
    }, (error: any) => {

    })
  }
}
