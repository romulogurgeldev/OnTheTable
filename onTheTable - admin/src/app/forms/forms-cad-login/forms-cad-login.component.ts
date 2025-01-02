import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-forms-cad-login',
  templateUrl: './forms-cad-login.component.html',
  styleUrls: ['./forms-cad-login.component.scss']
})
export class FormsCadLoginComponent implements OnInit {
  @Output() emailChange = new EventEmitter<any>();
  @Input() email: any;
  @Output() passwordChange = new EventEmitter<any>();
  @Input() password: any;
  @Output() paginaChange = new EventEmitter<any>();
  @Input() pagina: any;
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;
  @Output() telefoneChange = new EventEmitter<any>();
  @Input() telefone: any;
  @Output() nomeChange = new EventEmitter<any>();
  @Input() nome: any;




  public hide = true;
  public form : FormGroup;
  public statusMsg = "";
  public statusSenha = false;
  public erro = "";

  constructor(private fb: FormBuilder, 
    private router: Router, private usuarioService: UsuarioService, private loginService: LoginService, 
    private estabelecimentosService: EstabelecimentoService){
    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
        


      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),


      ])],
      telefone: ['', Validators.compose([

        Validators.minLength(11),

      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        this.noWhitespace,
        this.dontWhitespace

      ])],
      password2: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        this.noWhitespace,
        this.dontWhitespace

      ])],

    })
    console.log(this.form.controls['telefone'])
    
  }

  ngOnInit(): void {
  }
  compara(){
    console.log(this.form.controls['telefone'])
    if(this.form.controls['password'].value == this.form.controls['password2']){
      this.statusSenha = true;
      this.statusMsg = ""
    }
    else{
      this.statusSenha = false;
      this.statusMsg = "Senhas não conferem"
    }
    
  }

  noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
  dontWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').indexOf(' ') >= 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  async save(){
    this.usuarioService.verificaEmail(this.form.controls['email'].value, 'adm').subscribe(res => {
      if (res ===  false){
        this.erro = "Email já cadastrado"
      }
      else{
        this.emailChange.emit(this.form.controls['email'].value);
        this.telefoneChange.emit(this.form.controls['telefone'].value);
        this.nomeChange.emit(this.form.controls['nome'].value);
        this.passwordChange.emit(this.form.controls['password'].value);
        this.paginaChange.emit(this.pagina+1);
      }
    })

   
  }
  async verificaEmail(email: string){

  }


 



}
