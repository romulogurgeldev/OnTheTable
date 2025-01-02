import mongoose from "mongoose"

export class CreatePlanoUserDto {
    user: mongoose.Schema.Types.ObjectId
    plano: mongoose.Schema.Types.ObjectId
    inicio: Date
    formaPagamento: string
    createdAt: Date
    quantidade: number
}
