import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
    @Prop()
    address: string;
    @Prop()
    complement: string;
    @Prop()
    uf: string;
    @Prop()
    cep: string;
    @Prop()
    numberAddress: string;
    @Prop()
    city: string;
    @Prop()
    telphone: string;
    @Prop()
    bairro: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
