import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop()
    name: string;
    @Prop()
    type: string;
    @Prop()
    quantityPerFoodMax: number;
    @Prop()
    quantityPerFoodMin: number;
    
}

export const CategorySchema = SchemaFactory.createForClass(Category);

