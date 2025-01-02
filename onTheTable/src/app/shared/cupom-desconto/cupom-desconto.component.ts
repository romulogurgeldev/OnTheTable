import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cupom-desconto',
  templateUrl: './cupom-desconto.component.html',
  styleUrls: ['./cupom-desconto.component.css']
})
export class CupomDescontoComponent {
  codigoCupom: string;
  mensagemDesconto: string;

  @Output() discountEvent = new EventEmitter<number>();

  aplicarDesconto() {
    // Verifica se o código do cupom é válido e calcula o desconto
    const desconto = this.calcularDesconto(this.codigoCupom);
    if (desconto === 0) {
      this.mensagemDesconto = 'Código inválido';
    } else {
      this.mensagemDesconto = `Desconto de ${desconto}% aplicado!`;
      this.discountEvent.emit(desconto);
    }
  }

  calcularDesconto(codigo: string): number {
    // Implementação para calcular o desconto a partir do código do cupom
    // ...
    return 0;
  }
}
