import { ComplementoPedido } from './../complementoPedido/complementoPedido';
import mongoose from "mongoose";

export class Pedidos {
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    food: mongoose.Schema.Types.ObjectId;
    nameFood: string;
    imageFood: string;
    priceFood: number;
    quantidade: number;
    observacoes: string;
    status: boolean
    complementos: ComplementoPedido[]
    
}