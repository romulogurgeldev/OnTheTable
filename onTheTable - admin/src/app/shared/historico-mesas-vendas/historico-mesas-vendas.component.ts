import { SalesService } from './../../services/sales/sales.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-historico-mesas-vendas',
  templateUrl: './historico-mesas-vendas.component.html',
  styleUrls: ['./historico-mesas-vendas.component.scss']
})
export class HistoricoMesasVendasComponent implements OnInit {
  @Output() abrirChange = new EventEmitter<any>();
  @Input() abrir: any;
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;

  tables: any = [];
  meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  diaEscolhido = 1;
  mesEscolhido = "";
  anoEscolhido = 1;
  hoje = new Date();
  sumMonth = false;
  constructor(
    private mesaService: MesaService,
    private salesService: SalesService) { }

  ngOnInit(): void {
    this.diaEscolhido = this.hoje.getDate()
    this.anoEscolhido = this.hoje.getFullYear()
    
    this.mesEscolhido = this.hoje.toLocaleString('default', { month: 'long' });
    
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
    this.salesService.getTable(this.hoje.getMonth()+1, this.anoEscolhido, this.diaEscolhido, 5).subscribe(async (res: any) =>{
      this.tables = res;
      console.log(this.tables)
      
      for (let i = 0; i < this.tables.length; i++) {
        
        this.tables[i].nameTable = await this.pegaMesa(this.tables[i]._id.table);
      }
     
    })
  }
  pegaHistoricoByMonth(){
    this.sumMonth = true;
    this.diaEscolhido = this.hoje.getDate()
      
    this.mesEscolhido = this.hoje.toLocaleString('default', { month: 'long' });
    this.salesService.getTable(this.hoje.getMonth()+1, this.anoEscolhido, 0, 5, true).subscribe(async (res: any) =>{
      this.tables = res;
      console.log(this.tables)
      for (let i = 0; i < this.tables.length; i++) {
     
        
        this.tables[i].nameTable = await this.pegaMesa(this.tables[i].table);
      }
     
    })
  }

  async pegaMesa(id: string){
    const result: any = await this.mesaService.getName(id);
    return result.name;
  }
  abrirQuadro(){
    this.abrirChange.emit(true)
    this.modeChange.emit(2)
  }

}
