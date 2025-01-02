import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-perfil-funcionario',
  templateUrl: './perfil-funcionario.component.html',
  styleUrls: ['./perfil-funcionario.component.scss']
})
export class PerfilFuncionarioComponent implements OnInit {
  @Output() modeChange = new EventEmitter<number>();
  @Input() mode: any;

  @Output() funcionarioChange = new EventEmitter<any>();
  @Input() funcionario: any;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    console.log(this.funcionario)
  }
  changeMode(){
    this.funcionario = null;
    this.funcionarioChange.emit(this.funcionario);
  }

  async deleteFuncionario(){
    const result = await this.usuarioService.deleteEmployee(this.funcionario._id);
    window.location.reload();
  }
}
