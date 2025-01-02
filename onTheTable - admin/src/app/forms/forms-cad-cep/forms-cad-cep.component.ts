import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forms-cad-cep',
  templateUrl: './forms-cad-cep.component.html',
  styleUrls: ['./forms-cad-cep.component.scss']
})
export class FormsCadCepComponent implements OnInit {

  @Output() enderecoChange = new EventEmitter<any>();
  @Input() endereco: any;
  @Output() paginaChange = new EventEmitter<any>();
  @Input() pagina: any;
  @Output() cepCompletoChange = new EventEmitter<any>();
  @Input() cepCompleto: any;
  @Input() restauranteExtra: any;

  public hide = true;
  public form : FormGroup;
  
  public statusMsg = "";
  public statusSenha = false;
  public imagem:any = "./assets/buttons/uploadBtn.png";
  public statusImagem:any = false;
  statusCEP: any;
  titulo = ['Informações de Login', 'Informações Pessoais', 'Informações do Restaurante']

  constructor(private fb: FormBuilder, 
    private router: Router, private estabelecimentosService: EstabelecimentoService){

    this.form = this.fb.group({
      logradouro: ['', Validators.compose([
        Validators.required,
        


      ])],
      bairro: ['', Validators.compose([
        Validators.required,
        


      ])],
      localidade: ['', Validators.compose([
        Validators.required,
        


      ])],
      cep: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        


      ])],
      uf: ['', Validators.compose([
        Validators.required,
        


      ])],
      complemento: [''],
      numero: ['', Validators.compose([
        Validators.required,
        


      ])],
      telefone: [''],
    })
    
  }

  ngOnInit(): void {
  }
  async save(){
    this.endereco = {
      address: this.form.controls['logradouro'].value,
      complement: this.form.controls['complemento'].value,
      uf: this.form.controls['uf'].value,
      cep: this.form.controls['cep'].value,
      numberAddress: this.form.controls['numero'].value,
      city: this.form.controls['localidade'].value,
      telphone: this.form.controls['telefone'].value,
      bairro: this.form.controls['bairro'].value
    }
    this.enderecoChange.emit(this.endereco);
    
    if (this.restauranteExtra && this.form.valid) this.cepCompletoChange.emit(true);
   
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
        this.save();
        

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
  passaPagina(){
    this.paginaChange.emit(this.pagina+1);
  }

}
