import { PromotionService } from './../../services/promotion/promotion.service';
import { ComidaService } from 'src/app/services/comida/comida.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cad-promocao',
  templateUrl: './cad-promocao.component.html',
  styleUrls: ['./cad-promocao.component.scss']
})
export class CadPromocaoComponent implements OnInit {
  @Output() promotionsChange = new EventEmitter<string>();

  @Input() promotions: any;
  carregando = false;
  @Output() tipoChange = new EventEmitter<string>();

  @Input() tipo: any;
  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;

  @Output() categoriasChange = new EventEmitter<any>();
  @Input() categorias: any;
  semana: any = [false, false, false, false, false, false, false];
  horas: any = []
  periodo = false;
  semanaPeriodo = false;
  categoriaSelecionada: any;
  foodsSelect: any = []
  comidas: any;
  pesquisa = "";
  abrir: any;
  abrir2: any;
  valorDesconto = 0;
  ativo = [true, false, false]

  public form : FormGroup;


  constructor(
    private promotionServices: PromotionService,
    private fb: FormBuilder, 
    private mesaService: MesaService, 
    private comidaService: ComidaService,
    private categoriaService: CategoriaService, private _snackBar: MatSnackBar,
    private router: Router){

    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
      ])],
      tamanho: ['', Validators.compose([
        Validators.required,
      ])],

      dataInicio: [''],
      dataFim: [''],
      horaInicio: ['', Validators.compose([
        Validators.required,
      ])],
      horaFim: ['', Validators.compose([
        Validators.required,
      ])],
      tipo: ['', Validators.compose([
        Validators.required,
      ])],
      valorDesconto: ['', Validators.compose([
        Validators.required,
      ])],
      emDobro: [false]

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
    this.pegaRestaurante()

  }
  pegaRestaurante(){
    
    this.comidaService.getAllByRestaurant().subscribe(result =>{
      this.comidas = result;
      for (let i = 0; i < this.comidas.length; i++) {
        this.foodsSelect.push("")
        
      }
      console.log(this.comidas)

    })
  }
  // async save(){
  //   this.carregando = true;
  //   const category = this.form.controls['categoria'].value.split('/');
 
  //   const index = parseInt(category[0]);
  //   console.log(index)
  //   const dados = {
  //     restaurant: window.localStorage.getItem('idRestaurante'),
  //     category: category[1],
  //     name: this.form.controls['nome'].value,
  //     qrCode: "sem img",
  //     size: this.form.controls['tamanho'].value,
  //     status: true,
  //     chegada: null,
  //     reserved: false,
  //     reservations: null,
  //     icon: 'sem icone',
  //     url: environment.pwa+"/#/mesa/",
  //     participantes: [],
  //     cart: []

  //   }
  //   let result = await this.mesaService.create(dados);
  //   this.categorias[index].mesas.push(result);


   
  // }
  selecionaSemana(index: number){
    this.semana[index] = !this.semana[index]

  }
  selecionaComida(e: any, index: number, id: string){
    if (e.checked){
      this.foodsSelect[index] = id;
    }
    else{
      this.foodsSelect[index] = "";
    }
    console.log(this.foodsSelect)
  }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);

  }
  async save(){
    this.carregando = true;
    let comida: any = []
    for (let i = 0; i < this.foodsSelect.length; i++) {
      if(this.foodsSelect[i]){
        comida.push(this.foodsSelect[i])
      }
      
    }
    const dados = {
      name: this.form.controls['nome'].value,
      promotionStart: this.ativo[0]==true ? new Date() : this.form.controls['dataInicio'].value,
      promotionEnd: this.ativo[0]==true ? new Date() : this.form.controls['dataFim'].value,
      typeDiscount: this.form.controls['tipo'].value,
      discountValue: this.form.controls['valorDesconto'].value,
      foods: comida,
      doubleFood: this.form.controls['emDobro'].value,
      hourStart: this.form.controls['horaInicio'].value,
      hourEnd: this.form.controls['horaFim'].value,
      weekDay: this.ativo[0]==true ? [] : this.semana,
      status: true
    }
    console.log(dados)
    const result = await this.promotionServices.create(dados);
    this.promotions.push(result);
    this.promotionsChange.emit(this.promotions);
    this.carregando = false;

    this.form.reset();
    this.pegaRestaurante();
    this._snackBar.open('Cadastrado com sucesso', "ok");
  }
}
