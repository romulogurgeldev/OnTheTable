import { MesaService } from 'src/app/services/mesa/mesa.service';
import { ComidaService } from 'src/app/services/comida/comida.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.scss']
})
export class ListaProdutoComponent implements OnInit {
  @Output() mesaChange = new EventEmitter<any>();
  @Input() mesa: any;
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;
  produtos: any;
  pesquisa: any;
  quantidade: any = [];
  carregando = true;
  obs = "";
  cart: any = false;


  constructor(
    private _snackBar: MatSnackBar,
    private comidaService: ComidaService, 
    private mesaService: MesaService) { }

  ngOnInit(): void {
    console.log(this.mesa)

    this.comidaService.getAllByRestaurant(this.mesa.restaurant).subscribe(res =>{
      this.produtos = res;
      console.log(this.produtos)
      for (let i = 0; i < this.produtos.length; i++) {
        this.quantidade.push(0);
        
      }
      console.log(this.quantidade)
      this.carregando = false;
    })
  }
  async verificaCarrinho(){

    for (let i = 0; i < this.quantidade.length; i++) {
      if (this.quantidade[i]>0){
        this.cart = true;
        return;
      }

      
    }
    this.cart = false;
  }
  async removerCart(id: string, index: number){
    // this.mesa.cart.splice(index, 1);
    this.mesa.cart.splice(index, 1);
    const result = await this.mesaService.deleteCart(this.mesa._id, index);
  }
  async adicionarCarrinho(){
    for (let i = 0; i < this.quantidade.length; i++) {
      if (this.quantidade[i]>0){
        let dados = {
          name: "funcionário",
          food: this.produtos[0]._id,
          quantidade: this.quantidade[i],
          observacoes: this.obs,
          nameFood: this.produtos[0].name,
          imageFood: this.produtos[0].image.location,
          priceFood: this.produtos[0].price,
          status: false
    
        }
        const result = await this.mesaService.cart(this.mesa._id, dados);
        this.mesa.cart.push(dados);
      }

    }
    this._snackBar.open('Adicionado ao carrinho', "ok");


  }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);

  }
  observacao(e: any){

    this.obs = (e.target.value);

  }
  fecharPagina(){
    this.modeChange.emit(0);
  }
}
