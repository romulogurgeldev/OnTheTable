import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  pagamento: any = false;
  abrir: any;
  escolhido = 0;
  mesa: any;
  titulos = ["Carrinho", "Mesa", "Pedido"];
  carregando = false;
  idMesa: any;
  categoria: any;
  food: any;
  logado = false;
  cart: any;
  menu = true;

  constructor(

    private mesasService: MesasService, 

    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
  ) { 

    iconRegistry.addSvgIcon(
      'pedidos',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/bill.svg'));
    iconRegistry.addSvgIcon(
      'carrinho',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/cart.svg'));
    iconRegistry.addSvgIcon(
      'mesa',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/food.svg'));

  }


  ngOnInit(): void {
    const url = window.location.href.split('/');
    const idmesa: any = window.localStorage.getItem('mesa');
    this.idMesa = url[5]

    // this.mesasService.getOne(idmesa).subscribe((res: any)=>{
    //   this.idMesa = res.code;
    //   console.log(this.idMesa)
    // })


  }
  ngDoCheck(changes: SimpleChanges) {
    const url = window.location.href.split('/');
    this.idMesa = url[5]
    if (url[4]==="home" || url[4]==="camera"){
      this.menu = false;
    }
    else this.menu = true;
  }
  irPara(local: string){
    window.location.href = `#/${local}/${this.idMesa}`
  }
 



}
