import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pagamento: any = false;
  abrir: any;
  escolhido = 0;
  mesa: any;
  titulos = ["Carrinho", "Mesa", "Pedido"];
  carregando = false;
  id: any;
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
    this.id = url[url.length-1];
    this.pegaParticipantes();

  }

  fazerCheckin(){

    if ((window.localStorage.getItem('token') || window.localStorage.getItem('nome')) && this.mesa.participantes.length>0){
      this.logado = true;

    }
    else{
      this.logado = false;
    }

  }

  pegaParticipantes(){
    console.log('participantes')

    this.mesasService.getOneByCode(this.id).subscribe(res =>{
      this.mesa = res;
      this.carregando = false;  
      this.fazerCheckin();

    }, err => {
      console.log(err)
      alert(err.message);
      window.location.href = '#/home'
    })

  }


}
