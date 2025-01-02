import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forms-edit-cep',
  templateUrl: './forms-edit-cep.component.html',
  styleUrls: ['./forms-edit-cep.component.scss']
})
export class FormsEditCepComponent implements OnInit {

  @Input() carregando: any;
  @Output() carregandoChange = new EventEmitter<any>();
  @Input() usuario: any;
  @Output() usuarioChange = new EventEmitter<any>();
  @Input() cepCompleto: any;
  @Output() cepCompletoChange = new EventEmitter<any>();


  public form : FormGroup;
  carregandoCep = true;
  public foiAlterado = false;
  statusCEP: boolean = false;

  constructor(private fb: FormBuilder, 
    private _snackBar: MatSnackBar,
    private router: Router, 
    private usuarioService: UsuarioService, 
    private estabelecimentosService: EstabelecimentoService){
      this.form = this.fb.group({});

    
  }

  pegaForm(){
    this.form = this.fb.group({
      logradouro: [this.usuario.address?.address, Validators.compose([
        Validators.required,
      ])],
      bairro: [this.usuario.address?.bairro, Validators.compose([
        Validators.required,
      ])],
      localidade: [this.usuario.address?.city, Validators.compose([
        Validators.required,
      ])],
      cep: [this.usuario.address?.cep, Validators.compose([
        Validators.required,
      ])],
      uf: [this.usuario.address?.uf, Validators.compose([
        Validators.required,
      ])],
      complemento: [this.usuario.address?.complement],
      numero: [this.usuario.address?.numberAddress, Validators.compose([
        Validators.required,
      ])],
      telefone: [this.usuario.address?.telphone],
    })
    this.carregandoCep = false
    this.verificaForm();
  }

  ngOnInit(): void {
    
    console.log(this.carregando)
    this.estabelecimentosService.getById(this.usuario._id).subscribe(res => {
      this.usuario = res;
      this.carregandoCep = false;
      this.pegaForm()
    })
  }
  async save(){
    this.carregandoChange.emit(true);
    const dados = {
      address: {
        address: this.form.controls['logradouro'].value,
        complement: this.form.controls['complemento'].value,
        uf: this.form.controls['uf'].value,
        cep: this.form.controls['cep'].value,
        numberAddress: this.form.controls['numero'].value,
        city: this.form.controls['localidade'].value,
        telphone: this.form.controls['telefone'].value,
        bairro : this.form.controls['bairro'].value,
      }

    } 

    this.carregando = false;
  }
  verificaAlteracao(){
    let address = {
      address: this.form.controls['logradouro'].value,
      complement: this.form.controls['complemento'].value,
      uf: this.form.controls['uf'].value,
      cep: this.form.controls['cep'].value,
      numberAddress: this.form.controls['numero'].value,
      city: this.form.controls['localidade'].value,
      telphone: this.form.controls['telefone'].value,
      bairro: this.form.controls['bairro'].value
    }
    this.usuario.address = address;
    this.usuarioChange.emit(this.usuario);
    this.verificaForm()
  }
  async getCep(){
    if(this.form.controls['cep'].valid){
      window.localStorage.setItem('cep', 'true')
      this.estabelecimentosService.getCEP(this.form.controls['cep'].value).subscribe(res=>{
        if(res.localidade){
          this.statusCEP = true;
          this.form.controls['localidade'].setValue(res.localidade)
          this.form.controls['logradouro'].setValue(res.logradouro)
          this.form.controls['uf'].setValue(res.uf)
          this.form.controls['bairro'].setValue(res.bairro)
          
        }
        else this.statusCEP = false;

        

        window.localStorage.removeItem('cep');
      }, err =>{
        console.log(err)
        this.statusCEP = false;

      },)
    }
    else{
      console.log(this.form.controls['cep'])

      this.statusCEP = false;
    }

    
  }
  verificaForm(){
    if (this.form.valid){
      console.log("t")

      this.cepCompletoChange.emit(true)
    }
    else{
      console.log("f")
      this.cepCompletoChange.emit(false)

    }
  }


}
