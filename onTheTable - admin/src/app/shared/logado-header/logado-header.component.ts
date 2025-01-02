import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-logado-header',
  templateUrl: './logado-header.component.html',
  styleUrls: ['./logado-header.component.scss']
})
export class LogadoHeaderComponent implements OnInit {
  nomeLogado: any;


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    const result: any = this.loginService.getInfoUser(window.localStorage.getItem('token'));
    this.nomeLogado = result.name.split(' ')[0];
  }
  sair(){
    window.localStorage.clear();
    this.router.navigate(['/inicio'])
  }
}
