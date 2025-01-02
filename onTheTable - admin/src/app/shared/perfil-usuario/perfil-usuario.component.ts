import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any;
  abrir: any;
  tamanho = 6
  constructor(private usuarioService: UsuarioService, private loginService: LoginService) { }

  ngOnInit(): void {


    this.usuarioService.getOne().subscribe(res => {
      this.usuario = res;

    })
  }



}
