import mongoose from "mongoose";

export class CreateSaleDto {
    restaurant: mongoose.Schema.Types.ObjectId;
    food: mongoose.Schema.Types.ObjectId;
    table: mongoose.Schema.Types.ObjectId;
    quantidade: number;
    price: number;
    date: Date;

}
