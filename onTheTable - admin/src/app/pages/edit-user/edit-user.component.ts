import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  usuario: any;
  carregando = true;
  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.usuarioService.getOne(id).subscribe(res =>{
        this.usuario = res;
        this.carregando = false;
      }, err => {
        alert('Usuário não econtrado');
        window.location.href = '#/home'
      })

    });


  }
  irPara(){
    window.location.href="#/home"
  }

}
