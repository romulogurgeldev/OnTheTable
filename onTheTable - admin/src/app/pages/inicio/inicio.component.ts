import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  imageInicial = './assets/home/home_site.png'
  constructor() { }

  ngOnInit(): void {
  }

}
