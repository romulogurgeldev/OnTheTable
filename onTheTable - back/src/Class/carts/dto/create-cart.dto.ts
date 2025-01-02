import { Pedidos } from '../../pedidos/Pedidos';
import mongoose from "mongoose";

export class CreateCartDto {

    user: mongoose.Schema.Types.ObjectId;
    name: string;
    orders: Pedidos;
    status: boolean;
}
