import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';

@Component({
  selector: 'app-forms-cad-mesas',
  templateUrl: './forms-cad-mesas.component.html',
  styleUrls: ['./forms-cad-mesas.component.scss']
})
export class FormsCadMesasComponent implements OnInit {

  carregando = false;
  @Output() tipoChange = new EventEmitter<string>();

  @Input() tipo: any;
  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;

  @Output() categoriasChange = new EventEmitter<any>();
  @Input() categorias: any;
  categoriaSelecionada: any;




  public form : FormGroup;


  constructor(private fb: FormBuilder, private mesaService: MesaService,
    private categoriaService: CategoriaService, private _snackBar: MatSnackBar,
    private router: Router){

    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
      ])],
      tamanho: ['1', Validators.compose([
        Validators.required,
      ])],
      categoria: ['', Validators.compose([
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
    const dados = {
      restaurant: window.localStorage.getItem('idRestaurante'),
      category: category[1],
      name: this.form.controls['nome'].value,
      qrCode: "sem img",
      size: this.categoria.name!='Balcão' ? this.form.controls['tamanho'].value : "1",
      status: true,
      chegada: null,
      reserved: false,
      reservations: null,
      icon: 'sem icone',
      url: environment.pwa+"/#/mesa/",
      participantes: [],
      cart: []

    }
    let result = await this.mesaService.create(dados);
    this.categorias[index].mesas.push(result);
    this.carregando = false;
    this.form.reset();
    this._snackBar.open('Cadastrado com sucesso', "ok");

   
  }
 
}
