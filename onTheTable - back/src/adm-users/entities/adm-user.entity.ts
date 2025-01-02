import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type AdmUserDocument = AdmUser & Document;


@Schema()
export class AdmUser {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: mongoose.Schema.Types.ObjectId;
    @Prop()    
    plano: string;
}
export const AdmUserSchema = SchemaFactory.createForClass(AdmUser);

