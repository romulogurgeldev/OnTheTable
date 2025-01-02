import { Image } from '../../Class/image/Image';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema()
export class Food {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    categories: mongoose.Schema.Types.ObjectId;
    @Prop()
    name: string;
    @Prop()
    image: Image;
    @Prop()
    available: boolean;
    @Prop()
    description: string;
    @Prop()
    preparationTime: string;
    @Prop()
    type: string;
    @Prop()
    price: number;
    @Prop()
    complementos:boolean;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Promotion'})
    promotion: mongoose.Schema.Types.ObjectId;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
