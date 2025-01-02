import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: mongoose.Schema.Types.ObjectId;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Table'})
    table: mongoose.Schema.Types.ObjectId;
    @Prop()
    clientName: string;
    @Prop()
    clientTelephone: string;
    @Prop()
    date: Date;
    @Prop({default: "Aguardando confirmação"})
    status: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

