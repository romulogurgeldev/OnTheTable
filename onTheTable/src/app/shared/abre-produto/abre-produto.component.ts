import { UserService } from './../../services/user/user.service';
import { MesasService } from './../../services/mesas/mesas.service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-abre-produto',
  templateUrl: './abre-produto.component.html',
  styleUrls: ['./abre-produto.component.scss']
})
export class AbreProdutoComponent implements OnInit {
  @Output() comidaChange = new EventEmitter<any>();
  @Input() comida: any;

  @Output() idMesaChange = new EventEmitter<any>();
  @Input() idMesa: any;

  complementos: any;
  complementosEscolhidos: any = [];
  fixed = false;

  obrigatoriosForamEscolhidos = true;

  quantidade = 1;
  public form : FormGroup;
  carregando = false;
  token: any;
  user: any;
  escreveTexto = false;
  precoTotal = 0;
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private mesasService: MesasService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      obs: ['', Validators.compose([



      ])],




    })
   }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token');
    this.user = this.userService.getInfoUser(this.token);
    if(this.comida.comidasComplementos) this.obrigatoriosForamEscolhidos = false;
    this.precoTotal = this.comida.price;
  }
  fechaPagina(){
    this.comidaChange.emit(false);
  }

  async adicionarCarrinho(){
    this.carregando = true;
    const dados = {
      user: this.user.sub,
      name: window.localStorage.getItem('nome'),
      food: this.comida._id,
      quantidade: this.quantidade,
      observacoes: this.form.controls['obs'].value,
      nameFood: this.comida.name,
      imageFood: this.comida.image.location,
      priceFood: this.comida.price,
      status: false,
      complementos: this.complementosEscolhidos
    }
    try {
      const result = await this.mesasService.cart(this.idMesa, dados);
      this._snackBar.open('Adicionado ao carrinho', "ok");
      this.carregando = false;

      this.comidaChange.emit(false);

    } catch (error) {
      this._snackBar.open('Erro ao adicionar ao carrinho', "ok");
    }
    this.carregando = false;
  }
  @HostListener('window:scroll', ['$event']) onScroll() {
    if(window.scrollY>120){
      console.log('hera')
      this.fixed  = true;
    }
    else{
      console.log('nao era')
      this.fixed  = false;
    }

  }
  somaPreco(){
    this.precoTotal = this.comida.price
    this.complementosEscolhidos = []
    console.log(this.complementos)
    if (this.complementos) {
      for (let i = 0; i < this.complementos.length; i++) {
        for (let j = 0; j < this.complementos[i].complementos.length; j++) {
          if (this.complementos[i].complementos[j].quantidade>0){
            let complemento = {
              _id: this.complementos[i].complementos[j]._id,
              quantidade: this.complementos[i].complementos[j].quantidade,
              name: this.complementos[i].complementos[j].name,
              type: this.complementos[i].tipo,
              price: this.complementos[i].complementos[j].value,
              
            }
            this.complementosEscolhidos.push(complemento)
          }
          this.precoTotal = (this.precoTotal + this.complementos[i].complementos[j].quantidade*this.complementos[i].complementos[j].value)
          
        }
      }
    }
    return this.quantidade * ( this.precoTotal);
  }
}
