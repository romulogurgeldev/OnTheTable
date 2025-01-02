import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeuServico {

  constructor() { }

  validarCupom(cupom: string): number {
    // aqui você pode implementar a lógica de validação do cupom
    let desconto = 0;

    // por exemplo, se o cupom for "DESCONTO10", você pode conceder um desconto de 10%
    if (cupom === 'DESCONTO10') {
      desconto = 10;
    }

    return desconto;
  }
}
