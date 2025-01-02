import mongoose from "mongoose";

export class CreatePromotionDto {
    restaurant: mongoose.Schema.Types.ObjectId;
    name: string;
    promotionStart: Date;
    promotionEnd: Date;
    typeDiscount: string 
    discountValue: number
    foods: [mongoose.Schema.Types.ObjectId];
    doubleFood: boolean;
    hourStart: string;
    hourEnd: string;
    weekDay: [boolean];
    status: boolean;
}
