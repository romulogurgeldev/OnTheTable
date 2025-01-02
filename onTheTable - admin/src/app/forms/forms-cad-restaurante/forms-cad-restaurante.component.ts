import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-cad-restaurante',
  templateUrl: './forms-cad-restaurante.component.html',
  styleUrls: ['./forms-cad-restaurante.component.scss']
})
export class FormsCadRestauranteComponent implements OnInit {
  @Output() cnpjChange = new EventEmitter<string>();
  @Input() cnpj: any;
  @Output() nomeRestauranteChange = new EventEmitter<string>();
  @Input() nomeRestaurante: any;
  @Output() razaoSocialChange = new EventEmitter<any>();
  @Input() razaoSocial: any;
  @Output() enderecoRestauranteChange = new EventEmitter<any>();
  @Input() enderecoRestaurante: any;
  @Output() imageChange = new EventEmitter<number>();
  @Input() image: any;
  @Output() modeChange = new EventEmitter<number>();
  @Input() mode: any;
  @Output() paginaChange = new EventEmitter<number>();
  @Input() pagina: number = 0;
  @Output() telefoneChange = new EventEmitter<string>();
  @Input() telefone: any;
  @Input() restauranteExtra: any;

  public form : FormGroup;

  constructor(private fb: FormBuilder, 
    private router: Router){
    this.form = this.fb.group({
      nomeRestaurante: ['', Validators.compose([
        Validators.required,
      ])],
      cnpj: ['', Validators.compose([
        Validators.required,
        
      ])],
      razaoSocial: ['', Validators.compose([
        Validators.required,
      ])],
      telefone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(11),
      ])],
      

    })
    
  }

  ngOnInit(): void {
  }
  async save(){
    this.nomeRestauranteChange.emit(this.form.controls['nomeRestaurante'].value);
    this.cnpjChange.emit(this.form.controls['cnpj'].value);
    this.razaoSocialChange.emit(this.form.controls['razaoSocial'].value);
    this.telefoneChange.emit(this.form.controls['telefone'].value);
    this.paginaChange.emit(this.pagina+1);

  }



}
