import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from "mongoose";

export type SaleDocument = Sale & Document;

@Schema()
export class Sale {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Food'})
    food: mongoose.Schema.Types.ObjectId;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Table'})
    table: mongoose.Schema.Types.ObjectId;
    @Prop()
    quantidade: number;
    @Prop()
    price: number;
    @Prop()
    date: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

