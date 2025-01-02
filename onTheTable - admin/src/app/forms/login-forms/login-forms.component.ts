import { EstabelecimentoService } from './../../services/estabelecimento/estabelecimento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.scss']
})
export class LoginFormsComponent implements OnInit {
  public hide = true;
  public form : FormGroup;
  erro = "";
  constructor(private fb: FormBuilder, 
    private router: Router, private loginService: LoginService, private estabelecimentosService: EstabelecimentoService){
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required

      ])],
      password: ['', Validators.compose([
        Validators.required

      ])]
    })
  }

  ngOnInit(): void {
  }



  async logar(){

    const dados = {email: this.form.controls['email'].value, password: this.form.controls['password'].value}
    try {
      const result = await this.loginService.login(dados);
      if (result){
        this.router.navigate(['/home']);
        
      }
    } catch (error) {
      this.erro = "Email ou senha não conferem"
    }


 
  }

}

