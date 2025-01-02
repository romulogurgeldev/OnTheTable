import { CategoriaService } from './../../services/categoria/categoria.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplementosService } from 'src/app/services/complementos/complementos.service';

@Component({
  selector: 'app-forms-edit-complementos',
  templateUrl: './forms-edit-complementos.component.html',
  styleUrls: ['./forms-edit-complementos.component.scss']
})
export class FormsEditComplementosComponent implements OnInit {
  carregando = true;
  @Output() abrirChange = new EventEmitter<boolean>();
  @Input() abrir: any;
  @Output() complementosChange = new EventEmitter<boolean>();
  @Input() complementos: any;
  complementosEdit: any = [];
  public form : FormGroup;
  obrigatoriedade: any;
  minimo: any = 0;
  maximo: any = 0;
  nomeGrupo: any;
  constructor(
    private fb: FormBuilder, 
    private categoriaService: CategoriaService, 
    private complementosService: ComplementosService, 
    private _snackBar: MatSnackBar,
    private router: Router){

    this.form = this.fb.group({});

  }

  ngOnInit(): void {
    this.complementosEdit = this.complementos.complementos;
    console.log(this.complementos)
    this.maximo = this.complementos.maximo
    this.minimo = this.complementos.minimo
    this.obrigatoriedade = (!(this.minimo == 0)).toString()
    this.nomeGrupo = this.complementos.tipo;
    console.log(this.obrigatoriedade)
    this.carregando = false;
    // this.pegaForm();
  }
  pegaForm(){
    this.form = this.fb.group({
      nome: [this.complementos.tipo, Validators.compose([
        Validators.required,
      ])],
      obrigatoriedade: [this.obrigatoriedade, Validators.compose([
        Validators.required,
      ])],

    })
    this.carregando = false;
  }
  async save(){
    this.carregando = true;
    const dados = {
      name: this.nomeGrupo,
      type: "complementos",
      quantityPerFoodMax: this.maximo,
      quantityPerFoodMin: this.minimo
    }
    for (let i = 0; i < this.complementosEdit.length; i++) {
      this.complementosEdit[i].name = this.complementosEdit[i].name == ""   ? "sem nome" : this.complementosEdit[i].name
      this.complementosEdit[i].type = this.complementosEdit[i].type == ""  ? "sem nome" : this.complementosEdit[i].type
      this.complementosEdit[i].value = this.complementosEdit[i].value == "" ? "sem nome" : this.complementosEdit[i].value
      const result = await this.complementosService.edit(this.complementosEdit[i]._id, this.complementosEdit[i]);
      console.log(result)
    }

    
    let result = await this.categoriaService.edit(this.complementos.idCategoria, dados);
    const idCategoria = this.complementos.idCategoria;

    this.carregando = false;

    this._snackBar.open('Salvo com sucesso', "ok");

   
  }
 
  async delete(){
    for (let i = 0;  i< this.complementosEdit.length; i++) {
      const result = await this.deleteComplemento(this.complementosEdit[i]._id);
      console.log(result);
      
    }
    try {
      await this.categoriaService.delete(this.complementos.idCategoria)
    } catch (error) {
      this._snackBar.open('Erro ao excluir', "ok");
      console.log(error)
    }
  }
  async deleteComplemento(id: string){
    try {
      await this.complementosService.delete(id)
      let index = this.complementosEdit.findIndex((x: any) => x._id === id);
      this.complementosEdit.splice(index, 1);
    } catch (error) {
      this._snackBar.open('Erro ao excluir', "ok");
      console.log(error)
    }
  }
  contaQuantidade(value: number, minimo = true){
    if (minimo && this.obrigatoriedade == "true"){
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
    this.minimo = this.obrigatoriedade  == "false" ? 0 : this.minimo
    
  }
  fechar(){
    this.complementos = null;
    this.complementosChange.emit(this.complementos)
  }
}
