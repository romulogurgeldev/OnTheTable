import { Component, OnInit } from '@angular/core';
import { ComidaService } from 'src/app/services/comida/comida.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-historico-mais-vendidos-completo',
  templateUrl: './historico-mais-vendidos-completo.component.html',
  styleUrls: ['./historico-mais-vendidos-completo.component.scss']
})
export class HistoricoMaisVendidosCompletoComponent implements OnInit {
  foods: any;
  meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  diaEscolhido = 1;
  mesEscolhido = "";
  anoEscolhido = 1;
  hoje = new Date();
  sumMonth = false;
  total = 0;
  quantidade = 0;
  constructor(
    private comidaService: ComidaService,
    private salesService: SalesService) { }

  ngOnInit(): void {
    this.diaEscolhido = this.hoje.getDate()
    this.anoEscolhido = this.hoje.getFullYear()
    
    this.mesEscolhido = this.hoje.toLocaleString('default', { month: 'long' });
    console.log(this.hoje.getFullYear(), this.hoje.getMonth()+1, this.hoje.getDate())
    this.pegaHistoricoByDay();

  }
  escolherDia(valor = 0){
    if (this.sumMonth){
      this.hoje.setMonth(this.hoje.getMonth()+valor)

      this.pegaHistoricoByMonth()
    }
    else{
      this.hoje.setDate(this.hoje.getDate()+valor)
      this.pegaHistoricoByDay()
    }

  }
  pegaHistoricoByDay(){
    this.total = 0;
    this.quantidade = 0;
  
    this.sumMonth = false;

    this.diaEscolhido = this.hoje.getDate()
      
    this.mesEscolhido = this.hoje.toLocaleString('default', { month: 'long' });
    this.salesService.getFood(this.hoje.getMonth()+1, this.anoEscolhido, this.diaEscolhido, 1000).subscribe(async (res: any) =>{
      this.foods = res;
      let result: any;
      for (let i = 0; i < this.foods.length; i++) {
        result = await this.pegaComida(this.foods[i]._id.food);
        this.foods[i].nameFood = result.name;
        this.foods[i].priceFood = result.price;
        console.log(this.foods[i].count * result.price)
        this.total = this.total + (this.foods[i].count * result.price)
        this.quantidade = this.quantidade + this.foods[i].count;
      }
      console.log(this.foods)
    })
  }
  pegaHistoricoByMonth(){
    this.sumMonth = true;
    this.diaEscolhido = this.hoje.getDate()
    this.total = 0;
    this.quantidade = 0;
    this.mesEscolhido = this.hoje.toLocaleString('default', { month: 'long' });
    this.salesService.getFood(this.hoje.getMonth()+1, this.anoEscolhido, 0, 1000, true).subscribe(async (res: any) =>{
      this.foods = res;
      let result: any
      for (let i = 0; i < this.foods.length; i++) {
        result = await this.pegaComida(this.foods[i].food);
        this.foods[i].nameFood = result.name;
        this.foods[i].priceFood = result.price;
        console.log(this.foods[i].count * result.price)
        this.total = this.total + (this.foods[i].count * result.price)
        this.quantidade = this.quantidade + this.foods[i].count;
      }
      console.log(this.foods)
    })
  }

  async pegaComida(id: string){
    const result: any = await this.comidaService.getName(id);
    console.log(result)
    return result;
  }

}
