import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';

@Component({
  selector: 'app-forms-cad-funcionario',
  templateUrl: './forms-cad-funcionario.component.html',
  styleUrls: ['./forms-cad-funcionario.component.scss']
})
export class FormsCadFuncionarioComponent implements OnInit {
  @Output() cargoChange = new EventEmitter<string>();
  @Output() restauranteChange = new EventEmitter<string>();
  @Output() horaEntradaChange = new EventEmitter<Date>();
  @Output() horaSaidaChange = new EventEmitter<any>();
  @Output() paginaChange = new EventEmitter<number>();
  @Output() semanaChange = new EventEmitter<any>();
  @Output() modeChange = new EventEmitter<number>();
  @Input() mode: any;
  @Input() semana: any;
  @Input() cargo: any;
  @Input() restaurante: any;
  @Input() horaEntrada: any;
  @Input() horaSaida: any;
  @Input() pagina: number = 0;

  horas: any = []
  restaurantes: any;

  public form : FormGroup;


  constructor(private fb: FormBuilder, 
    private estabelecimentosService: EstabelecimentoService,
    private router: Router){

    this.form = this.fb.group({
      cargo: ['', Validators.compose([
        Validators.required,
      ])],
      restaurante: ['', Validators.compose([
        Validators.required,
      ])],
      horaEntrada: ['', Validators.compose([
        Validators.required,
      ])],
      horaSaida: ['', Validators.compose([
        Validators.required,
      ])],
      

    })
    
  }

  ngOnInit(): void {
    for (let i = 0; i < 1440; i+=30) {
      const horas = Math.floor(i/ 60);          
      const min = i % 60;
      const textoHoras = (`00${horas}`).slice(-2);
      const textoMinutos = (`00${min}`).slice(-2);
      
      this.horas.push(`${textoHoras }:${textoMinutos}`);
      
    } 
    this.estabelecimentosService.getAllByUser().subscribe( res =>{
      this.restaurantes = res;
      console.log(res)
    })
    

  }
  async save(){
    console.log("save")
    this.restauranteChange.emit(this.form.controls['restaurante'].value);
    this.cargoChange.emit(this.form.controls['cargo'].value);
    this.horaEntradaChange.emit(this.form.controls['horaEntrada'].value);
    
    this.horaSaidaChange.emit(this.form.controls['horaSaida'].value);

   
  }
  selecionaSemana(index: number){
    this.semana[index] = !this.semana[index]
    this.semanaChange.emit(this.semana);
    this.save();
  }
  mudaPagina(){
    this.paginaChange.emit(this.pagina+1)
  }

}
