import { Pedidos } from './../../Class/pedidos/Pedidos';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop()
    orderNumber: string
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Table'})
    table: mongoose.Schema.Types.ObjectId
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'OrderTable'})
    orderTable: mongoose.Schema.Types.ObjectId
    @Prop([{type: Pedidos}])
    orderFood: Pedidos
    @Prop()
    originalPrice: number
    @Prop()
    discount: boolean
    @Prop()
    discountValue: number
    @Prop()
    amountPaid: number 
    @Prop()
    formPayment: string
    @Prop()
    date: Date
    @Prop()
    dateConfirma: Date
    @Prop()
    dateCancelado: Date
    @Prop()
    datePreparado: Date
    @Prop()
    dateEntregue: Date
    @Prop()
    dateFinalizado: Date
    @Prop()
    status: string
    @Prop()
    active: boolean
}

export const OrderSchema = SchemaFactory.createForClass(Order);
