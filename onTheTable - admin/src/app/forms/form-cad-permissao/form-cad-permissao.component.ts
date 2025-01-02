import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidaService } from 'src/app/services/comida/comida.service';
import { ImageService } from 'src/app/services/image/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cad-permissao',
  templateUrl: './form-cad-permissao.component.html',
  styleUrls: ['./form-cad-permissao.component.scss']
})
export class FormCadPermissaoComponent implements OnInit {

  @Output() permissaoChange = new EventEmitter<any>();
  @Input() permissao: any;
  
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;

  @Output() carregandoChange = new EventEmitter<any>();
  @Input() carregando: any;
  categoriaSelecionada: any;

  image: any;

  constructor(
  
    private fb: FormBuilder , private _snackBar: MatSnackBar,
    private router: Router){

    
  }

  ngOnInit(): void {

    console.log(this.permissao)

  }
  async save(){

    this.permissaoChange.emit(this.permissao);



   
  }
 



}
