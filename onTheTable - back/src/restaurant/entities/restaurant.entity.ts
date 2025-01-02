import { Image } from '../../Class/image/Image';
import { Address } from '../../Class/addresses/entities/address.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userAdm: mongoose.Schema.Types.ObjectId;
    @Prop()
    address: Address;
    @Prop()
    foto: Image;
    @Prop()
    name: string;
    @Prop()
    cnpj: string;
    @Prop()
    razaoSocial: string;
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'User'}])
    employees: mongoose.Schema.Types.ObjectId;
    @Prop()
    telefone: string;
    @Prop()
    status: boolean;

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
