import mongoose from "mongoose";

export class CreateNotificationDto {
    restaurant: mongoose.Schema.Types.ObjectId;
    table: mongoose.Schema.Types.ObjectId;
    type: string;
    msg: string;
    lida: boolean;
    notificou: boolean;
    createdAt: Date;
}
