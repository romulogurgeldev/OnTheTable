import { ComidaService } from './../../services/comida/comida.service';
import { SalesService } from './../../services/sales/sales.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-historico-mais-vendidos',
  templateUrl: './historico-mais-vendidos.component.html',
  styleUrls: ['./historico-mais-vendidos.component.scss']
})
export class HistoricoMaisVendidosComponent implements OnInit {
  @Output() abrirChange = new EventEmitter<any>();
  @Input() abrir: any;
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;

  foods: any;
  meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  diaEscolhido = 1;
  mesEscolhido = "";
  anoEscolhido = 1;
  hoje = new Date();
  sumMonth = false;
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
    this.sumMonth = false;

    this.diaEscolhido = this.hoje.getDate()
      
    this.mesEscolhido = this.hoje.toLocaleString('default', { month: 'long' });
    this.salesService.getFood(this.hoje.getMonth()+1, this.anoEscolhido, this.diaEscolhido, 5).subscribe(async (res: any) =>{
      this.foods = res;
      
      for (let i = 0; i < this.foods.length; i++) {
        
        this.foods[i].nameFood = await this.pegaComida(this.foods[i]._id.food);
      }
      console.log(this.foods)
    })
  }
  pegaHistoricoByMonth(){
    this.sumMonth = true;
    this.diaEscolhido = this.hoje.getDate()
      
    this.mesEscolhido = this.hoje.toLocaleString('default', { month: 'long' });
    this.salesService.getFood(this.hoje.getMonth()+1, this.anoEscolhido, 0, 5, true).subscribe(async (res: any) =>{
      this.foods = res;
      console.log(this.foods)
      for (let i = 0; i < this.foods.length; i++) {
     
        
        this.foods[i].nameFood = await this.pegaComida(this.foods[i].food);
      }
      console.log(this.foods)
    })
  }

  async pegaComida(id: string){
    const result: any = await this.comidaService.getName(id);
    console.log(result)
    return result.name;
  }
  abrirQuadro(){
    this.abrirChange.emit(true)
    this.modeChange.emit(1)
  }

}
