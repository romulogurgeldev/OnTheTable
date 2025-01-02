import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"
import { ComplementoPedido } from "src/Class/complementoPedido/complementoPedido";

export type OrderFoodDocument = OrderFood & Document;

@Schema()
export class OrderFood {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Food'})
    food: mongoose.Schema.Types.ObjectId
    @Prop()
    quantidade: number
    @Prop()
    valor: number
    @Prop()
    status: boolean
    @Prop([])
    complementos: ComplementoPedido
}

export const OrderFoodSchema = SchemaFactory.createForClass(OrderFood);
