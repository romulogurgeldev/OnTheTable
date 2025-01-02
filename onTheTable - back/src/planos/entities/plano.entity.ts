import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type PlanoDocument = Plano & Document;

@Schema()
export class Plano {
    @Prop()
    name: string
    @Prop()
    quantityOrders: number
    @Prop()
    quantityTables: number
    @Prop()
    quantityRestaurants: number
    @Prop()
    support: boolean
    @Prop()
    periodPayment: number
    @Prop()
    period: number
    @Prop()
    preco: number
    @Prop()
    status: boolean
}

export const PlanoSchema = SchemaFactory.createForClass(Plano);