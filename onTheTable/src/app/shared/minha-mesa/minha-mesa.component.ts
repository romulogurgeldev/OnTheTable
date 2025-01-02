import { MesasService } from 'src/app/services/mesas/mesas.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-minha-mesa',
  templateUrl: './minha-mesa.component.html',
  styleUrls: ['./minha-mesa.component.scss']
})
export class MinhaMesaComponent implements OnInit {
  @Output() mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  token: string = "";
  nome: string = "";
  isInTable: any;
  constructor(
    private _snackBar: MatSnackBar,
    private mesasService: MesasService) { }

  ngOnInit(): void {
    this.verificaParticipante()
    this.token = window.localStorage.getItem('token') || "";
    console.log(this.token)
    this.nome = window.localStorage.getItem('nome') || "";
    console.log(this.nome)
  }
  verificaParticipante(){
    this.mesasService.findParticipante().subscribe((res: any)=>{
      console.log(res)
      this.isInTable = res.result;
      console.log(this.isInTable)
    });
  }
  irPara(){

    window.location.href = "#/login"
  }
  async checkin(){
    const dadosCheckin = {
      chegada: new Date(),
      name: window.localStorage.getItem('nome'),
      user: window.localStorage.getItem('user')
    }
 
    try {
      const result2 = await this.mesasService.checkin(this.mesa._id, dadosCheckin);
      this.mesaChange.emit(result2)
      

      this._snackBar.open('Checkin com sucesso, bom apetite!', "ok");
      this.verificaParticipante();    
    } catch (error) {
      this._snackBar.open('Erro', "ok");
    }
  }

}
