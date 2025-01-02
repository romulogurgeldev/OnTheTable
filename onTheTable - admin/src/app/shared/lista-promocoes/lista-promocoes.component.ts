
import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-lista-promocoes',
  templateUrl: './lista-promocoes.component.html',
  styleUrls: ['./lista-promocoes.component.scss']
})
export class ListaPromocoesComponent implements OnInit {
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;
  @Output() promotionsChange = new EventEmitter<string>();
  @Input() promotions: any;
  @Output() productsChange = new EventEmitter<string>();
  @Input() products: any;
  @Output() abrirChange = new EventEmitter<boolean>();
  @Input() abrir: any;
  @Output() pesquisaChange = new EventEmitter<string>();
  @Input() pesquisa: string = "";
  public funcionarioEscolhido: any;
  cadaComida: any = [];
  comida = false;
  public tamanho = 6;
  constructor() { }

  ngOnInit(): void {

    // this.tamanhoTela();
    console.log(this.promotions)
  }
  primeiroNome(nome: string){
    return nome = nome.split(' ')[0];
  }
  
  tamanhoTela(){
    if (window.screen.width <= 630 &&  window.screen.width >= 451) { // 768px portrait

      this.tamanho = 5;
    }
    else if (window.screen.width < 450) { // 768px portrait
 
      this.tamanho = 4;
    }
    else{
      this.tamanho = 6;

    }
  }
  escolheFuncionario(funcionario: any){
    this.funcionarioEscolhido = funcionario;
  }
  // @HostListener("window:resize", [])
  // private onResize() {
  //   this.detectScreenSize();
  // }

  // ngAfterViewInit() {
  //   this.detectScreenSize();
  // }

  // private detectScreenSize() {
  //   // we will write this logic later
  //   this.tamanhoTela();
  // }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);
    console.log(this.pesquisa)
  }
  descontar(original: number, valorDescontar: number, typeDiscount: string){
    let result;
    console.log(typeDiscount)
    if(typeDiscount=='porcento'){
      result = original - (original*(valorDescontar/100));
    }
    else if(!typeDiscount){
      result = original/2;
    }
    else{
      result = original - valorDescontar;
    }
    return result;

  }
  abrirProdutos(produtos: any){
    this.modeChange.emit(2);
    this.productsChange.emit(produtos);
    this.abrirChange.emit(true);
  }
  abrirEdit(produtos: any){
    this.modeChange.emit(3);
    this.productsChange.emit(produtos);
    this.abrirChange.emit(true);
  }

}
