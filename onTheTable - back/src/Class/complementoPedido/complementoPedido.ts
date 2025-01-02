import mongoose from "mongoose";

export class ComplementoPedido {
    complemento: mongoose.Schema.Types.ObjectId;
    name: string;
    quantidade: number;
    price: number;
    type: string;
}