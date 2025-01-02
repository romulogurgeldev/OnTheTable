import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Msg } from "src/Class/msg/msg";

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    usuario: mongoose.Schema.Types.ObjectId
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Table'})
    mesa: mongoose.Schema.Types.ObjectId
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurante: mongoose.Schema.Types.ObjectId
    @Prop([{type: Msg}])
    msg: Msg
    @Prop()
    createdAt: Date
    @Prop({default: false})
    usuarioLido: boolean
    @Prop({default: false})
    restauranteLido: boolean
    @Prop({default: true})
    status: boolean

}

export const MessageSchema = SchemaFactory.createForClass(Message);
