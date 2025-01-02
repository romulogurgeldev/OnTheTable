import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Table'})
    table: mongoose.Schema.Types.ObjectId;
    @Prop()
    type: string;
    @Prop()
    msg: string;
    @Prop()
    lida: boolean;
    @Prop()
    notificou: boolean;
    @Prop()
    createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);