import mongoose from "mongoose"

export class CreateOrderTableDto {
    restaurant: mongoose.Schema.Types.ObjectId
    table: mongoose.Schema.Types.ObjectId
    user: mongoose.Schema.Types.ObjectId
    orderFood: [mongoose.Schema.Types.ObjectId ]
    discount: boolean
    discountValue: number
    amountPaid: number 
    formPayment: string
    date: Date
    parcial: boolean
}

