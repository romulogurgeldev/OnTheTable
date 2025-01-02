import { LoginService } from 'src/app/services/login/login.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password-code',
  templateUrl: './forget-password-code.component.html',
  styleUrls: ['./forget-password-code.component.scss']
})
export class ForgetPasswordCodeComponent implements OnInit {
  @Output() emailChange = new EventEmitter<any>();
  @Input() email: any;

  @Output() pageChange = new EventEmitter<any>();
  @Input() page: any;

  @Output() idChange = new EventEmitter<any>();
  @Input() id: any;

  public hide = true;
  public form : FormGroup;
  erro = "";
  constructor(private fb: FormBuilder, 
    private router: Router, private loginService: LoginService){
    this.form = this.fb.group({
      code: ['', Validators.compose([
        Validators.required

      ])],

    })
  }

  ngOnInit(): void {
    

  }



  async enviarCode(){
    
    const dados = {
      email: this.email,
      code: this.form.controls['code'].value
    }

    try {
      const result = await this.loginService.esqueceuSenhaSendCode(dados);
      if (result){
        this.pageChange.emit(this.page + 1);
        this.idChange.emit(dados.code);

      }
      else{
        this.erro = "Código incorreto"
      }
    } catch (error) {
      this.erro = "Erro Desconhecido"
    }
  }

}
