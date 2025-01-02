import { MesaService } from 'src/app/services/mesa/mesa.service';
import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-historico-mesas-vendas-completo',
  templateUrl: './historico-mesas-vendas-completo.component.html',
  styleUrls: ['./historico-mesas-vendas-completo.component.scss']
})
export class HistoricoMesasVendasCompletoComponent implements OnInit {

  tables: any = [];
  meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  diaEscolhido = 1;
  mesEscolhido = "";
  anoEscolhido = 1;
  hoje = new Date();
  sumMonth = false;
  total = 0;
  quantidade = 0;
  constructor(
    private mesaService: MesaService,
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
    this.salesService.getTable(this.hoje.getMonth()+1, this.anoEscolhido, this.diaEscolhido, 1000).subscribe(async (res: any) =>{
      this.tables = res;
      console.log(this.tables)
      let result: any;
      for (let i = 0; i < this.tables.length; i++) {
        result = await this.pegaMesa(this.tables[i]._id.table);
        this.tables[i].nameTable = result.name;
        // this.tables[i].priceFood = result.price;
        // console.log(this.tables[i].count * result.price)
        this.total = this.total + (this.tables[i].count)
        // this.quantidade = this.quantidade + this.tables[i].count;
      }
      
    })
  }
  pegaHistoricoByMonth(){
    this.sumMonth = true;
    this.diaEscolhido = this.hoje.getDate()
    this.total = 0;
    this.quantidade = 0;
    this.mesEscolhido = this.hoje.toLocaleString('default', { month: 'long' });
    this.salesService.getTable(this.hoje.getMonth()+1, this.anoEscolhido, 0, 1000, true).subscribe(async (res: any) =>{
      this.tables = res;
      let result: any
      for (let i = 0; i < this.tables.length; i++) {
        result = await this.pegaMesa(this.tables[i].table);
        this.tables[i].nameTable = result.name;
        // this.tables[i].priceFood = result.price;
        console.log(this.tables[i].count * result.price)
        this.total = this.total + (this.tables[i].count)
        // this.quantidade = this.quantidade + this.tables[i].count;
      }
      console.log(this.tables)
    })
  }

  async pegaMesa(id: string){
    const result: any = await this.mesaService.getName(id);
    console.log(result)
    return result;
  }

}
