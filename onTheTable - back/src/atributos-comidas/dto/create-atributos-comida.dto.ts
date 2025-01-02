import mongoose from "mongoose";

export class CreateAtributosComidaDto {
    food: mongoose.Schema.Types.ObjectId;
    category: mongoose.Schema.Types.ObjectId;
    restaurant: mongoose.Schema.Types.ObjectId;
    name: string;
    type: string;
    value: number;
    
}
