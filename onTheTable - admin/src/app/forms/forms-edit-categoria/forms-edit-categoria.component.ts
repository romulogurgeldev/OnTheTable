import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-forms-edit-categoria',
  templateUrl: './forms-edit-categoria.component.html',
  styleUrls: ['./forms-edit-categoria.component.scss']
})
export class FormsEditCategoriaComponent implements OnInit {
  carregando = true;
  @Output() tipoChange = new EventEmitter<string>();
  @Input() tipo: any;
  @Output() categoriasChange = new EventEmitter<string>();
  @Input() categorias: any;
  @Output() categoriaChange = new EventEmitter<string>();
  @Input() categoria: any;
  @Output() abrirChange = new EventEmitter<boolean>();
  @Input() abrir: any;

  public form : FormGroup;


  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private _snackBar: MatSnackBar,
    private router: Router){

    this.form = this.fb.group({});

  }

  ngOnInit(): void {
    console.log(this.categorias)
    this.pegaForm();
  }
  pegaForm(){
    this.form = this.fb.group({
      nome: [this.categoria.name, Validators.compose([
        Validators.required,
      ])],

    })
    this.carregando = false;
  }
  async save(){
    this.carregando = true;
    const dados = {
      name: this.form.controls['nome'].value,
      type: this.tipo,
      restaurant: window.localStorage.getItem('idRestaurante')
    }

    
    let result = await this.categoriaService.edit(this.categoria._id, dados);

    const idCategoria = this.categoria._id;
    const indexCategoria = this.categorias.indexOf(this.categorias.filter(function(obj: any){
      return obj._id == idCategoria;
    })[0]);
    this.categorias[indexCategoria] = result;


    this.categoriasChange.emit(this.categorias);
    if (this.tipo === 'comida'){
      result.comidas = [];

    }
    
    else if (this.tipo === 'mesa'){
      result.mesas = [];

    }

    this.carregando = false;

    this._snackBar.open('Salvo com sucesso', "ok");

   
  }
 
  async delete(){
    try {
      await this.categoriaService.delete(this.categoria._id)
      let item: any;
      let index = 0;
      for ( item of this.categorias) {
        if (item._id == this.categoria._id){
          this.categorias.splice(index, 1);
          this.abrirChange.emit(false)
          this._snackBar.open('Categoria excluida', "ok");
        }
        index ++;
      }
    } catch (error) {
      this._snackBar.open('Erro ao excluir', "ok");
      console.log(error)
    }
  }


}
