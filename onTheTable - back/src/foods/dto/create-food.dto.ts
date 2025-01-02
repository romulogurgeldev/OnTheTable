import { Image } from '../../Class/image/Image';
import mongoose from "mongoose";

export class CreateFoodDto {
    restaurant: mongoose.Schema.Types.ObjectId;
    categories: mongoose.Schema.Types.ObjectId;
    name: string;
    image: Image;
    available: boolean;
    description: string;
    preparationTime: string;
    type: string;
    price: number;
    promotion: mongoose.Schema.Types.ObjectId;
    complementos: boolean

}
