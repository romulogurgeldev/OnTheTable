import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms-edit-user',
  templateUrl: './forms-edit-user.component.html',
  styleUrls: ['./forms-edit-user.component.scss']
})
export class FormsEditUserComponent implements OnInit {
  @Input() carregando: any;
  @Output() carregandoChange = new EventEmitter<any>();
  @Input() usuario: any;
  @Output() usuarioChange = new EventEmitter<any>();

  public form : FormGroup;
  public foiAlterado = false;
  cpf: any;
  statusCPF: boolean = false;

  constructor(private fb: FormBuilder,  
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router){
    this.form = this.fb.group({}); 
  }
  pegaForm(){
    this.form = this.fb.group({
      nome: [this.usuario.name, Validators.compose([
        Validators.required,
      ])],
      cpf: [this.usuario.cpf, Validators.compose([
        Validators.required,
      ])],
      dataNascimento: [this.usuario.birthday, Validators.compose([
        Validators.required,
      ])],
      

    })
    this.cpf = this.usuario.cpf

  }

  ngOnInit(): void {

    this.pegaForm();
  }
  async save(){
    this.carregando = true;
    this.carregandoChange.emit(this.carregando);


    const dados = {
      name: this.form.controls['nome'].value,
      cpf: this.form.controls['cpf'].value,
      birthday: this.form.controls['dataNascimento'].value,
    }

    try {
      const res = await this.usuarioService.edit(this.usuario._id, dados);

      this._snackBar.open('Dados alterados com sucesso', "ok");

    } catch (error) {

      this._snackBar.open('Dados não foram salvos', "error");

    }
    this.carregando = false;
    this.carregandoChange.emit(this.carregando);
    console.log(this.carregando)

   
  }
  verificaAlteracao(){

    if (this.form.controls['nome'].value != this.usuario.name){
      console.log('alterou nome')
      this.foiAlterado = true
    }
    else if (this.form.controls['cpf'].value != this.usuario.cpf){
      console.log('alterou cpf')
      this.foiAlterado = true
    }
    else if (this.form.controls['dataNascimento'].value != this.usuario.birthday){
      console.log('alterou birth')
      this.foiAlterado = true
    }
    else{
      console.log('nao alterou')
      this.foiAlterado = false;
    }
  }

  verificaCPF(){
    let cpf = this.cpf;
    console.log(this.cpf)
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)){
      this.statusCPF = false;
      return false;
    } 
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e: any, i: any){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    if(result==true) this.statusCPF = true;
    else this.statusCPF = false;
    return result;
  }


}
