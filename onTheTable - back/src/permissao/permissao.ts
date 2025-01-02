import { Pedidos } from './pedidos';
import { Ajuste } from './ajuste';
import { Historico } from './historico';
import { Delivery } from './delivery';
export class Permissao {
    pedidos: Pedidos;
    historico: Historico;
    ajustes: Ajuste;
    delivery: Delivery;
}