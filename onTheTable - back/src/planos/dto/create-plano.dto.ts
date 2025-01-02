import mongoose from "mongoose"

export class CreatePlanoDto {
    // restaurant: mongoose.Schema.Types.ObjectId
    name: string
    quantityOrders: number
    quantityTables: number
    quantityRestaurants: number
    support: boolean
    periodPayment: number
    period: number
    preco: number
    status: boolean
}
