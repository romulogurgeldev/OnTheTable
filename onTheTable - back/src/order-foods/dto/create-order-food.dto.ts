import mongoose from "mongoose"
import { ComplementoPedido } from "src/Class/complementoPedido/complementoPedido"

export class CreateOrderFoodDto {
    restaurant: mongoose.Schema.Types.ObjectId
    food: mongoose.Schema.Types.ObjectId
    quantidade: number
    valor: number
    status: boolean
    complementos: ComplementoPedido[]
}
