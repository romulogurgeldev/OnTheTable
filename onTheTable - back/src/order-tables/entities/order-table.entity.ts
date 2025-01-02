import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type OrderTableDocument = OrderTable & Document;

@Schema()
export class OrderTable {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Table'})
    table: mongoose.Schema.Types.ObjectId
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: mongoose.Schema.Types.ObjectId
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}])
    orderFood: mongoose.Schema.Types.ObjectId
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
    parcial: boolean

}
export const OrderTableSchema = SchemaFactory.createForClass(OrderTable);