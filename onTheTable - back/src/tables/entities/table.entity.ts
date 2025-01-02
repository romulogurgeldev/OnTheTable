import { Pedidos } from './../../Class/pedidos/Pedidos';
import { ClienteMesa } from '../../Class/clienteMesa/clienteMesa';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose"
import { Cart } from 'src/Class/carts/entities/cart.entity';

export type TableDocument = Table & Document;

@Schema()
export class Table {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    category: mongoose.Schema.Types.ObjectId
    @Prop()
    name: string
    @Prop()
    size: string
    @Prop()
    qrCode: string
    @Prop()
    status: boolean
    @Prop()
    chegada: Date
    @Prop()
    reserved: boolean
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}])
    reservations: mongoose.Schema.Types.ObjectId
    @Prop()
    icon: string
    @Prop()
    url: string
    @Prop([{type: ClienteMesa}])
    participantes: ClienteMesa
    @Prop([{type: Pedidos}])
    cart: Pedidos
    @Prop()
    code: string
}

export const TableSchema = SchemaFactory.createForClass(Table);
