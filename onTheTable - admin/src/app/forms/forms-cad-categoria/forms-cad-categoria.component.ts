import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-forms-cad-categoria',
  templateUrl: './forms-cad-categoria.component.html',
  styleUrls: ['./forms-cad-categoria.component.scss']
})
export class FormsCadCategoriaComponent implements OnInit {
  carregando = false;
  @Output() tipoChange = new EventEmitter<string>();

  @Input() tipo: any;
  @Output() categoriasChange = new EventEmitter<string>();

  @Input() categorias: any;



  public form : FormGroup;


  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private _snackBar: MatSnackBar,
    private router: Router){

    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
      ])],

    })
    
  }

  ngOnInit(): void {
  }
  async save(){
    this.carregando = true;
    const dados = {
      name: this.form.controls['nome'].value,
      type: this.tipo,
      restaurant: window.localStorage.getItem('idRestaurante')
    }

    
    let result = await this.categoriaService.create(dados);
    this.categorias.push(result);
    this.categoriasChange.emit(this.categorias);
    if (this.tipo === 'comida'){
      result.comidas = [];

    }
    
    else if (this.tipo === 'mesa'){
      result.mesas = [];

    }

    this.carregando = false;
    this.form.reset();
    this._snackBar.open('Cadastrado com sucesso', "ok");

   
  }
 




}
