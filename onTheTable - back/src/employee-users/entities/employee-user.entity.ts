import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Permissao } from "src/permissao/permissao";

export type EmployeeUserDocument = EmployeeUser & Document;

@Schema()
export class EmployeeUser {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: mongoose.Schema.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userBoss: mongoose.Schema.Types.ObjectId;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop()
    cargo: string;
    @Prop()
    status: string;
    @Prop()
    horaSaida: string;
    @Prop()
    horaEntrada: string;
    @Prop()
    semana: string[];
    @Prop()
    permissao: Permissao;
}
export const EmployeeUserSchema = SchemaFactory.createForClass(EmployeeUser);
