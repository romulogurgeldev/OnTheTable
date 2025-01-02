import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from 'mongoose';

export type PromotionDocument = Promotion & Document;

@Schema()
export class Promotion {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop()
    name: string;
    @Prop()
    promotionStart: Date;
    @Prop()
    promotionEnd: Date;
    @Prop()
    typeDiscount: string 
    @Prop()
    discountValue: number
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Food'}])
    foods: mongoose.Schema.Types.ObjectId
    @Prop()
    doubleFood: boolean;
    @Prop()
    hourStart: string;
    @Prop()
    hourEnd: string;
    @Prop()
    weekDay: boolean[];
    @Prop()
    status: boolean;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
