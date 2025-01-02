import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-cad-user',
  templateUrl: './cad-user.component.html',
  styleUrls: ['./cad-user.component.scss']
})
export class CadUserComponent implements OnInit {
  @Output() mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  @Output() logadoChange = new EventEmitter<any>();
  @Input() logado: any;
  public form : FormGroup;
  constructor(private fb: FormBuilder, private mesasService: MesasService, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
        


      ])],
      telefone: ['', Validators.compose([
        Validators.required,
        


      ])]
    })
   }

  ngOnInit(): void {
  }

  async checkin(){
    const dados = {
      chegada: new Date(),
      name: this.form.controls['nome'].value,
      leader: this.mesa.participantes.length == 0 ? true : false,
      telefone: this.form.controls['telefone'].value
    }
    try {
      const result = await this.mesasService.checkin(this.mesa._id, dados);
      window.localStorage.setItem('nome', dados.name);
      window.localStorage.setItem('telefone', dados.telefone);
      this.logadoChange.emit(true);
      this._snackBar.open('Bom apetite!', "ok");
    } catch (error) {
      this._snackBar.open('Erro desconhecido', "ok");
    }


  }

}
