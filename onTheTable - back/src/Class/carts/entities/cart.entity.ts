import { Pedidos } from '../../pedidos/Pedidos';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: mongoose.Schema.Types.ObjectId;
    @Prop()
    name: string;
    @Prop([])
    orders: Pedidos;
}

export const CartSchema = SchemaFactory.createForClass(Cart);