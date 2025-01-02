import { LoginService } from 'src/app/services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  abrir: any ;

  botoes: any;
  
  escolha:any;
  numeroEscolha =  1;
  constructor(
    private loginService: LoginService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private router: Router, private route: ActivatedRoute) { 
    this.botoes =  {
        pedidos: [
        {titulo: 'Mesas', endereco:'/pedidos/mesas', selecionado: false, svg:"mesas", visualizacao: true}, 
        {titulo: 'Cozinha', endereco:'/pedidos/cozinha', selecionado: false, svg:"cozinha", visualizacao: true},
        {titulo: 'Delivery', endereco:'/delivery', selecionado: false, svg:"delivery", visualizacao: true}],
        historico: [{titulo: 'Histórico', endereco:'/historico', selecionado: false, svg:"historico", visualizacao: true}],
        ajustes: [
        {titulo: 'Cardápio', endereco:'/ajustes/cardapio', selecionado: false, svg:"cardapio", visualizacao: true}, 
        {titulo: 'Mesas', endereco:'/ajustes/mesas-config', selecionado: false, svg:"mesas", visualizacao: true}, 
        {titulo: 'Promoções', endereco:'/ajustes/promocoes', selecionado: false, svg:"promo", visualizacao: true},
        // {titulo: 'Configurações Gerais', endereco:'/ajustes/configuracoes-gerais', selecionado: false, svg:"config", visualizacao: true}
        ],
       }
    this.escolha = this.botoes.pedidos;
      iconRegistry.addSvgIcon(
        'pedidos',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/pedidos.svg'));
      iconRegistry.addSvgIcon(
        'cozinha',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/cozinha.svg'));
      iconRegistry.addSvgIcon(
        'mesas',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/mesas.svg'));
      iconRegistry.addSvgIcon(
        'config',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/config.svg'));
      iconRegistry.addSvgIcon(
        'historico',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/historico.svg'));
      iconRegistry.addSvgIcon(
        'cardapio',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/cardapio.svg'));
      iconRegistry.addSvgIcon(
        'delivery',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/delivery.svg'));
      iconRegistry.addSvgIcon(
        'promo',
        sanitizer.bypassSecurityTrustResourceUrl('./assets/icones/promo.svg'));
  }

  ngOnInit(): void {
    let qualRota = this.router.url.split('/');
    
    if (qualRota[qualRota.length - 1]=='mesas'){
      this.botoes.pedidos[0].selecionado = true;
      this.escolha = this.botoes.pedidos
      this.numeroEscolha = 1;
    }
    else if (qualRota[qualRota.length - 1]=='cozinha'){
      this.botoes.pedidos[1].selecionado = true;
      this.escolha = this.botoes.pedidos
      this.numeroEscolha = 2;
    }
    else if (qualRota[qualRota.length - 1]=='historico'){
      
      this.botoes.historico[0].selecionado = true;
      this.escolha = this.botoes.historico
      this.numeroEscolha = 2;
    }
    else if (qualRota[qualRota.length - 1]=='cardapio'){
      this.botoes.ajustes[0].selecionado = true;
      this.escolha = this.botoes.ajustes
      this.numeroEscolha = 3;
    }
    else if (qualRota[qualRota.length - 1]=='config'){
      this.botoes.ajustes[1].selecionado = true;
      this.escolha = this.botoes.ajustes
      this.numeroEscolha = 3;
    }
    else if (qualRota[qualRota.length - 1]=='mesas-config'){
      this.botoes.ajustes[1].selecionado = true;
      this.escolha = this.botoes.ajustes
      this.numeroEscolha = 1;
    }
    else if (qualRota[qualRota.length - 1]=='promocoes'){
      this.botoes.ajustes[2].selecionado = true;
      this.escolha = this.botoes.ajustes
      this.numeroEscolha = 2;
    }
    else if (qualRota[qualRota.length - 1]=='delivery'){
      this.botoes.delivery[0].selecionado = true;
      this.escolha = this.botoes.pedidos
      this.numeroEscolha = 3;
    }
    const result: any = this.loginService.getInfoUser(window.localStorage.getItem('token'));
    this.pegaUser(result.sub)


  }
  async pegaUser(id: string){
    const result: any = await this.loginService.getFuncionario(id);
    console.log('func', result)
    if (result){
      const permissao = result.permissao

      this.botoes = {
        pedidos: [{titulo: 'Mesas', endereco:'/pedidos/mesas', selecionado: false, svg:"mesas", visualizacao: permissao.pedidos.mesas}, 
        {titulo: 'Cozinha', endereco:'/pedidos/cozinha', selecionado: false, svg:"cozinha", visualizacao: permissao.pedidos.cozinha},
        {titulo: 'Delivery', endereco:'/delivery', selecionado: false, svg:"delivery", visualizacao: true},],
        historico: [{titulo: 'Histórico', endereco:'/historico', selecionado: false, svg:"historico", visualizacao: permissao.historico.historico}],
        ajustes: [{titulo: 'Cardápio', endereco:'/ajustes/cardapio', selecionado: false, svg:"cardapio", visualizacao: permissao.ajustes.cardapio}, 
        {titulo: 'Mesas', endereco:'/ajustes/mesas-config', selecionado: false, svg:"mesas", visualizacao: permissao.ajustes.mesa}, 
        {titulo: 'Promoções', endereco:'/ajustes/promocoes', selecionado: false, svg:"promo", visualizacao: permissao.ajustes.promotion},
        // {titulo: 'Configurações Gerais', endereco:'/ajustes/configuracoes-gerais', selecionado: false, svg:"config", visualizacao: permissao.ajustes.config}
      ],
        delivery: [{titulo: 'Delivery', endereco:'/delivery', selecionado: false, svg:"delivery", visualizacao: permissao.delivery.delivery}],
      }
    }
    else{
      this.botoes = {
        pedidos: [{titulo: 'Mesas', endereco:'/pedidos/mesas', selecionado: false, svg:"mesas", visualizacao: true}, 
        {titulo: 'Cozinha', endereco:'/pedidos/cozinha', selecionado: false, svg:"cozinha", visualizacao: true},
        {titulo: 'Delivery', endereco:'/delivery', selecionado: false, svg:"delivery", visualizacao: true},],
        historico: [{titulo: 'Histórico', endereco:'/historico', selecionado: false, svg:"historico", visualizacao: true}],
        ajustes: [{titulo: 'Cardápio', endereco:'/ajustes/cardapio', selecionado: false, svg:"cardapio", visualizacao: true}, 
        {titulo: 'Mesas', endereco:'/ajustes/mesas-config', selecionado: false, svg:"mesas", visualizacao: true}, 
        {titulo: 'Promoções', endereco:'/ajustes/promocoes', selecionado: false, svg:"promo", visualizacao: true},
        // {titulo: 'Configurações Gerais', endereco:'/ajustes/configuracoes-gerais', selecionado: false, svg:"config", visualizacao: true}
      ],
        delivery: [{titulo: 'Delivery', endereco:'/delivery', selecionado: false, svg:"delivery", visualizacao: true}],
      }
    }

  }
  fazEscolha(escolha: any, numeroEscolha: number){
    this.numeroEscolha = numeroEscolha;
    
    this.escolha = escolha;
  }

  irPara(id: any){
    this.apagaBotoes();
    this.route.params.subscribe(params => {
      const ide = params['id'];
      window.location.href = `#/restaurante/${ide}${id}`
    });
  }
  apagaBotoes(){
    for (let index = 0; index < this.botoes.pedidos.length; index++) {
      this.botoes.pedidos[index].selecionado = false;
      
    }
    
    for (let index = 0; index < this.botoes.historico.length; index++) {
      this.botoes.historico[index].selecionado = false;
      
    }
    for (let index = 0; index < this.botoes.ajustes.length; index++) {
      this.botoes.ajustes[index].selecionado = false;
      
    }
    for (let index = 0; index < this.botoes.delivery.length; index++) {
      this.botoes.delivery[index].selecionado = false;
      
    }
    
  }
}
