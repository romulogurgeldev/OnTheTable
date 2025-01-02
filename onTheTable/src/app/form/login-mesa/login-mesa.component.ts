import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-login-mesa',
  templateUrl: './login-mesa.component.html',
  styleUrls: ['./login-mesa.component.scss']
})
export class LoginMesaComponent implements OnInit {
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;

  public form : FormGroup;
  mesa: any;
  logadoChange: any;
  constructor(private fb: FormBuilder, private mesasService: MesasService, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
        


      ])],
      telefone: ['', Validators.compose([
        Validators.required,
        


      ])],
      code: ['', Validators.compose([
        Validators.required,
        


      ])]
    })
   }

  ngOnInit(): void {
    console.log(this.mode)
  }
  fechar(){
    console.log("fehga")
    this.modeChange.emit(0);
  }

  async checkin(){
    await this.mesasService.getOneByCode(this.form.controls['code'].value).subscribe(async res =>{
      const result: any = res;
      if (res){
        const dados = {
          chegada: new Date(),
          name: this.form.controls['nome'].value,
          leader: result.participantes.length == 0 ? true : false
        }
        console.log(result._id)
        const result2 = await this.mesasService.checkin(result._id, dados);
        window.localStorage.setItem('nome', dados.name);
        window.location.href = "#/mesa/"+result.code
        this.logadoChange.emit(true);
        this._snackBar.open('Bom apetite!', "ok");
      }
      
      else{
        this._snackBar.open('Código errado', "ok");
        
      }
    }, err => {
      this._snackBar.open('Código errado', "ok");

    });
    // try {
    //   // const result = await this.mesasService.checkin(this.mesa._id, dados);

    //   console.log(result)



    // } catch (error) {
    //   this._snackBar.open('Erro desconhecido', "ok");
    // }


  }

}
