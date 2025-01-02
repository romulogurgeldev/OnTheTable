import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-forms-edit-login',
  templateUrl: './forms-edit-login.component.html',
  styleUrls: ['./forms-edit-login.component.scss']
})
export class FormsEditLoginComponent implements OnInit {
  @Input() usuario: any;
  @Output() usuarioChange = new EventEmitter<any>();
  @Input() carregando: any;
  @Output() carregandoChange = new EventEmitter<any>();

  public hide = true;
  public form : FormGroup;
  public statusMsg = "";
  public statusSenha = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar,
    private router: Router, private usuarioService: UsuarioService, private loginService: LoginService, ){
    this.form = this.fb.group({}); 

  }

  pegaForm(){
    this.form = this.fb.group({
      email: [{value: this.usuario.email, disabled: true}, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),


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
      passwordA: [{value: this.usuario.category == 'funcionario' ? '123456' : '' , disabled: false}, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        this.noWhitespace,
        this.dontWhitespace

      ])],
    })

  }

  ngOnInit(): void {
    this.pegaForm();
  }
  compara(){
    
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

  async saveLogin(){
    this.carregandoChange.emit(true)
    const login = {
      email: this.form.controls['email'].value,
      password: this.form.controls['passwordA'].value,
    }
    const dados = {
      password: this.form.controls['password'].value,
    }
    if (this.usuario.category == 'funcionario'){
      try {
        const res = await this.usuarioService.edit(this.usuario._id, dados);
        this._snackBar.open('Senha trocada com sucesso', "ok");
        this.form.controls['password'].reset();
        this.form.controls['password2'].reset();
      } catch (error) {
        this._snackBar.open('Senha atual não confere', "error");
  
      }
    }
    else{
      try {
        const res = await this.usuarioService.editLogin(dados, login);
        this._snackBar.open('Senha trocada com sucesso', "ok");
        this.form.controls['passwordA'].reset();
        this.form.controls['password'].reset();
        this.form.controls['password2'].reset();
      } catch (error) {
        this._snackBar.open('Senha atual não confere', "error");
  
      }
    }


    this.carregandoChange.emit(false)


   
  }

 


}
