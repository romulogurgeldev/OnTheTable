import { Pedidos } from './../../Class/pedidos/Pedidos';
import { Cart } from '../../Class/carts/entities/cart.entity';
import { ClienteMesa } from '../../Class/clienteMesa/clienteMesa';
import mongoose from "mongoose"

export class CreateTableDto {
    restaurant: mongoose.Schema.Types.ObjectId
    category: mongoose.Schema.Types.ObjectId
    name: string
    size: string
    qrCode: string
    status: boolean
    chegada: Date
    reserved: boolean
    reservations: mongoose.Schema.Types.ObjectId
    icon: string
    url: string;
    participantes: [ClienteMesa]
    cart: [Pedidos]
    code: string
}
