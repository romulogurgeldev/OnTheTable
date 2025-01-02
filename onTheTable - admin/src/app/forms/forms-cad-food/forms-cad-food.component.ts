import { ImageService } from './../../services/image/image.service';
import { ComidaService } from './../../services/comida/comida.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplementosService } from 'src/app/services/complementos/complementos.service';

@Component({
  selector: 'app-forms-cad-food',
  templateUrl: './forms-cad-food.component.html',
  styleUrls: ['./forms-cad-food.component.scss']
})
export class FormsCadFoodComponent implements OnInit {
  carregando = false;
  @Output() tipoChange = new EventEmitter<string>();

  @Input() tipo: any;
  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;

  @Output() categoriasChange = new EventEmitter<any>();
  @Input() categorias: any;
  categoriaSelecionada: any;
  image: any;
  complementos: any = [];
  temComplementos = false;


  public form : FormGroup;
  paginaComplementos = false;

  constructor(
    private imageService: ImageService,
    private fb: FormBuilder, 
    private comidaService: ComidaService,
    private categoriaService: CategoriaService, 
    private complementosService: ComplementosService, 
    private _snackBar: MatSnackBar,
    private router: Router){

    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
      ])],
      descricao: ['', Validators.compose([
        Validators.required,
      ])],
      tamanho: ['', Validators.compose([
        Validators.required,
      ])],
      preco: ['', Validators.compose([
        Validators.required,
      ])],
      categoria: ['', Validators.compose([
        Validators.required,
      ])],      
      tempo: ['', Validators.compose([
        Validators.required,
      ])],

    })

    
  }

  ngOnInit(): void {

    

  }
  async save(){
    this.carregando = true;
    const category = this.form.controls['categoria'].value.split('/');
 
    const index = parseInt(category[0]);
    console.log(index)
    let resultImage: any
    if (this.image) resultImage = await this.imageService.create(this.image);
    const dados = {
      restaurant: window.localStorage.getItem('idRestaurante'),
      categories: category[1],
      name: this.form.controls['nome'].value,
      image: this.image ? {nome: this.form.controls['nome'].value, key: resultImage.key, location: resultImage.Location} : {nome: this.form.controls['nome'].value, key: "local", location: "./assets/icones/food.png"},
      available: true,
      description: this.form.controls['descricao'].value,
      preparationTime: this.form.controls['tempo'].value,
      type: this.form.controls['tamanho'].value,
      price: this.form.controls['preco'].value,
      complementos: this.temComplementos

    }
    console.log(dados);
    try {
      let result = await this.comidaService.create(dados);
      console.log(result)
      if (this.temComplementos) await this.adicionaComplementos(result._id);

      this.categorias[index].comidas.push(result);
      this.carregando = false;
      this.form.reset();
      this.complementos = []
      this.temComplementos = false;
      this.paginaComplementos = false;
      this._snackBar.open('Cadastrado com sucesso', "ok");
    } catch (error) {
      this.carregando = false;

      this._snackBar.open('Erro ao cadastrar', "ok");
    }

   
  }
  async adicionaComplementos(idComida: string){
    for (let i = 0; i < this.complementos.length; i++) {
      let dados = {
        name: this.complementos[i].tipo,
        type: "complementos",
        quantityPerFoodMax: this.complementos[i].maximo,
        quantityPerFoodMin: this.complementos[i].minimo

      }
      const result = await this.categoriaService.create(dados);
      console.log(result)
      for (let j = 0; j < this.complementos[i].complementos.length; j++) {
        let dadosComplementos = {
          food: idComida,
          category: result._id,
          name: this.complementos[i].complementos[j].name,
          type: this.complementos[i].complementos[j].type,
          value: this.complementos[i].complementos[j].value,
        }
        const result2 = await this.complementosService.create(dadosComplementos);
        console.log(result2)
      }
        
    }
  }


}
