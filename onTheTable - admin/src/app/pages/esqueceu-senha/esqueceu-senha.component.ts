import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.scss']
})
export class EsqueceuSenhaComponent implements OnInit {
  public email = "";
  public page = 0;
  public id = "";
  constructor() { }

  ngOnInit(): void {
  }

}
