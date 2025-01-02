import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type AtributosComidaDocument = AtributosComida & Document;

@Schema()
export class AtributosComida {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Food'})
    food: mongoose.Schema.Types.ObjectId;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    category: mongoose.Schema.Types.ObjectId;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop()
    name: string;
    @Prop()
    type: string;
    @Prop()
    value: number;
}

export const AtributosComidaSchema = SchemaFactory.createForClass(AtributosComida);