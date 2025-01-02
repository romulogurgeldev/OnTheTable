import mongoose from "mongoose";

export class CreateCategoryDto {
    restaurant: mongoose.Schema.Types.ObjectId;
    name: string;
    type: string;
    quantityPerFoodMax: number;
    quantityPerFoodMin: number;
}
