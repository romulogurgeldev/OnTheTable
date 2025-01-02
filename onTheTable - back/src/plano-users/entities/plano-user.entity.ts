import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"

export type PlanoUserDocument = PlanoUser & Document;

@Schema()
export class PlanoUser {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: mongoose.Schema.Types.ObjectId
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Plano'})
    plano: mongoose.Schema.Types.ObjectId
    @Prop()
    inicio: Date
    @Prop()
    createdAt: Date
    @Prop()
    formaPagamento: string
    @Prop({default: 1})
    quantidade: number
}

export const PlanoUserSchema = SchemaFactory.createForClass(PlanoUser);