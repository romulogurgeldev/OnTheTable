import mongoose from "mongoose";

export class CreateReservationDto {
    restaurant: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    table: mongoose.Schema.Types.ObjectId;
    clientName: string;
    clientTelephone: string;
    date: Date;
    status: string
}
