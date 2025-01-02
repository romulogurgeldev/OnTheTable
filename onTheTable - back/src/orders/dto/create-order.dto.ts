import { Pedidos } from './../../Class/pedidos/Pedidos';
import mongoose from "mongoose"

export class CreateOrderDto {
    orderNumber: string
    restaurant: mongoose.Schema.Types.ObjectId
    table: mongoose.Schema.Types.ObjectId 
    orderTable: mongoose.Schema.Types.ObjectId 
    orderFood: [Pedidos]
    originalPrice: number
    discount: boolean
    discountValue: number
    amountPaid: number 
    formPayment: string
    date: Date
    dateConfirma: Date
    dateCancelado: Date
    datePreparado: Date
    dateEntregue: Date
    dateFinalizado: Date
    status: string
    active: boolean
    

}
