import { Router } from '@angular/router';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password-email',
  templateUrl: './forget-password-email.component.html',
  styleUrls: ['./forget-password-email.component.scss']
})
export class ForgetPasswordEmailComponent implements OnInit {
  @Output() emailChange = new EventEmitter<any>();
  @Input() email: any;

  @Output() pageChange = new EventEmitter<any>();
  @Input() page: any;

  carregando = true;
  public form : FormGroup;
  erro = "";
  constructor(private fb: FormBuilder, 
    private router: Router, private loginService: LoginService){
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required

      ])],
    })
    this.carregando = false;
  }

  ngOnInit(): void {
  }



  async enviarEmail(){
    this.carregando = true;
    const dados = {
      email: this.form.controls['email'].value
    }
    try {
      const result = await this.loginService.esqueceuSenhaSendEmail(dados);
      if (result){
        this.emailChange.emit(this.form.controls['email'].value);
        this.pageChange.emit(this.page+1);
      }
      else{
        this.erro = "Email não cadastrado"

      }
    } 
    catch (error) {
      this.erro = "Erro desconhecido"
    }
    this.carregando = false;
  }

}
