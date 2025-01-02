import { LoginService } from 'src/app/services/login/login.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forms-cad-password',
  templateUrl: './forms-cad-password.component.html',
  styleUrls: ['./forms-cad-password.component.scss']
})
export class FormsCadPasswordComponent implements OnInit {
  @Output() emailChange = new EventEmitter<any>();
  @Input() email: any;

  @Output() pageChange = new EventEmitter<any>();
  @Input() page: any;

  @Output() idChange = new EventEmitter<any>();
  @Input() id: any;

  public hide = true;
  public form : FormGroup;
  public statusMsg = "";
  public statusSenha = false;
  carregando = true;
  erro = "";
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar,
    private router: Router, private loginService: LoginService){
    this.form = this.fb.group({
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
    this.carregando = false;
  }

  ngOnInit(): void {
    

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


  async mudarSenha(){
    this.carregando = true;
    const dados = {
      email: this.email,
      code: this.id,
      password: this.form.controls['password'].value
    }

    try {
      const result = await this.loginService.trocaSenha(dados);
      console.log(result)
      if (result){
        this.pageChange.emit(0);
        this._snackBar.open('Senha trocada com sucesso', "ok");
        window.location.href = "#/login"
      }
      else{
        this.erro = "Senha não foi trocada"
      }
    } catch (error) {
      console.log(error)
      this.erro = "Erro Desconhecido"
    }
    this.carregando = false;
  }


}
