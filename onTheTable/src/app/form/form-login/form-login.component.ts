import { UserService } from './../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  @Output() cadastroChange = new EventEmitter<any>();
  @Input() cadastro: any;
  @Output() logadoChange = new EventEmitter<any>();
  @Input() logado: any;
  public hide = true;
  public form : FormGroup;
  code: boolean ;
  carregando = true;
  constructor(private fb: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
        


      ])],
      email: ['', Validators.compose([
        Validators.required,
        


      ])],
      cpf: ['', Validators.compose([
        Validators.required,
        


      ])],
      code: ['', Validators.compose([
        Validators.required,
        


      ])],

    })

    this.carregando = false;
   }

  ngOnInit(): void {

  }

  async checkin(){
    this.carregando = true;
    const dados = {
      name: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      cpf: this.form.controls['cpf'].value
    }
    window.localStorage.setItem('email', dados.email);
    const result = await this.userService.create(dados);
    this.carregando = false;
    this.code = true;
    console.log(result)
  }
  async login(){
    this.carregando = true;
    const dados = {
      email: window.localStorage.getItem('email'),
      password: this.form.controls['code'].value,

    }
    console.log(dados)
    try {
      const result = await this.userService.login(dados)

      this.carregando = false;
      this.cadastroChange.emit(true);
    } catch (error) {
      this.carregando = false;
      alert("código não confere")


    }

  }
}
