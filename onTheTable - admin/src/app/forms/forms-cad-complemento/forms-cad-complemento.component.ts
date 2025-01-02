import { ComplementosService } from 'src/app/services/complementos/complementos.service';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidaService } from 'src/app/services/comida/comida.service';
import { ImageService } from 'src/app/services/image/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forms-cad-complemento',
  templateUrl: './forms-cad-complemento.component.html',
  styleUrls: ['./forms-cad-complemento.component.scss']
})
export class FormsCadComplementoComponent implements OnInit {
  carregando = false;
  @Output() complementosChange = new EventEmitter<string>();
  @Input() complementos: any;
  @Output() temComplementosChange = new EventEmitter<boolean>();
  @Input() temComplementos: any;
  @Output() comidaChange = new EventEmitter<any>();
  @Input() comida: any;
  @Output() addChange = new EventEmitter<any>();
  @Input() add: any;
  tipo: any;
  image: any;
 
  formComplementos = false;
  formComplementoIndividual = false;
  paginaComplementos = false;
  minimo = 0;
  maximo = 1;
  obrigatoriedade = false;
  complemento: any = {
    tipo: "",
    minimo: 0,
    maximo: 0,
    complementos: [],
  }
  preco = "0.00"
  abrir: any = [];
  public form : FormGroup;


  constructor(
    private imageService: ImageService,
    private fb: FormBuilder, private comidaService: ComidaService,
    private complementosService: ComplementosService,
    private categoriaService: CategoriaService, private _snackBar: MatSnackBar,
    private router: Router){

    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
      ])],
      categoria: ['', Validators.compose([
        Validators.required,
      ])],
      preco: [0, Validators.compose([
        Validators.required,
      ])],
    })

    
  }

  ngOnInit(): void {
    if (this.comida) this.complementos = []
  }

  
  
  async save(){
    this.criaComplemento()
    this.complementos.push(this.complemento);
    this.complementosChange.emit(this.complementos);

    if (this.comida) this.saveDireto();

    this.form.reset();
    this.formComplementos = false;
    this.formComplementos = false;
    this.formComplementoIndividual = false;
    this.paginaComplementos = false;
    this.obrigatoriedade = false;
    this.abrir = []
    for (let i = 0; i < this.complementos.length; i++) {
      this.abrir.push("")
      
    }
    this.complemento= {
      tipo: "",
      minimo: 0,
      maximo: 0,
      complementos: []
    }
  }
 
  contaQuantidade(value: number, minimo = true){
    if (minimo && this.obrigatoriedade == true){
      this.minimo = this.minimo + value<0 ? this.minimo : this.minimo+value;
      this.maximo = this.maximo<this.minimo? this.maximo+1 : this.maximo
    }
    else if (!minimo){
      console.log('k')
      this.maximo = this.maximo + value<0 ? this.maximo : this.maximo+value;
      this.minimo = this.minimo>=this.maximo ? this.minimo-1 : this.minimo
    }
    this.maximo = this.maximo<1 ? 1 : this.maximo
    this.minimo = this.minimo<1  == true ? 1 : this.minimo
    this.minimo = this.obrigatoriedade  == false ? 0 : this.minimo
    
  }

  criaComplemento(){
    if(this.form.controls['nome'].value){
      const complementoSave: any = {
    
        name: this.form.controls['nome'].value,
        value: this.form.controls['preco'].value,
        type: this.tipo,
        restaurante: window.localStorage.getItem("idRestaurante")
      }
      this.complemento.tipo = this.form.controls['categoria'].value;
      this.complemento.maximo = this.maximo
      this.complemento.minimo = this.minimo
      this.complemento.complementos.push(complementoSave)
      this.form.controls['nome'].setValue("");   
      this.form.controls['nome'].markAsUntouched() 
      this.form.controls['preco'].setValue("");
      this.form.controls['preco'].markAsUntouched()
      console.log(this.complemento)
    }
  }
  checkComplemento(valor: boolean){
    this.temComplementos = valor;
    this.temComplementosChange.emit(valor)
  }

  async saveDireto(){
    this.comida.complementos = false;
    this.comidaChange.emit(this.comida)
    for (let i = 0; i < this.complementos.length; i++) {
      let dados = {
        restaurant: window.localStorage.getItem('idRestaurante'),
        name: this.complementos[i].tipo,
        type: "complementos",
        quantityPerFoodMax: this.complementos[i].maximo,
        quantityPerFoodMin: this.complementos[i].minimo

      }
      const result = await this.categoriaService.create(dados);
      console.log(result, this.complementos)
      for (let j = 0; j < this.complementos[i].complementos.length; j++) {
        let dadosComplementos = {
          food: this.comida._id,
          category: result._id,
          name: this.complementos[i].complementos[j].name,
          type: this.complementos[i].complementos[j].type,
          value: this.complementos[i].complementos[j].value,
        }
        const result2 = await this.complementosService.create(dadosComplementos);
        console.log(result2)
      }
        
    }
    this.comida.complementos = true;
    const comidaResult = await this.comidaService.edit(this.comida._id, this.comida);
  }
  fechar(){
    this.comidaChange.emit(this.comida)
    this.addChange.emit(false);
  }
  verificaPreco(){

    console.log(this.form.controls['preco'].value)
    if (this.form.controls['preco'].value == null || this.form.controls['preco'].value<0){
      this.form.controls['preco'].setValue(0)
    }
  }
  changeMask(){
    // this.mascara = "0000000000,00"
    if (this.preco.length==this.form.controls['preco'].value.length){
      console.log('nao mudou')
    }
    else if (this.preco.length>this.form.controls['preco'].value.length){
      console.log('diminuiu')
    }
    else {
      console.log('aumentou')
    }
    // let valorRecebido = this.form.controls['preco'].value ?this.form.controls['preco'].value : "0,00";
    // this.form.controls['preco'].setValue(null)
    // // if (valorRecebido>=1) valorRecebido = valorRecebido/100
    // // else if (valorRecebido>=0.1) valorRecebido = valorRecebido/10
    // this.form.controls['preco'].setValue(valorRecebido)
    // console.log(valorRecebido)

    
  }

}
