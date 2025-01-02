import mongoose from "mongoose";

export class Msg {
    remetente: mongoose.Schema.Types.ObjectId;
    msg: string;
    date: Date;
    restaurante: boolean
}