import mongoose from 'mongoose';
import { Msg } from './../../Class/msg/msg';
export class CreateMessageDto {
    restaurante: mongoose.Schema.Types.ObjectId;
    mesa: mongoose.Schema.Types.ObjectId;
    usuario: mongoose.Schema.Types.ObjectId;
    msg: Msg[];
    createdeAt: Date;
    restauranteLido: boolean;
    usuarioLido: boolean;
    status: boolean;
}
