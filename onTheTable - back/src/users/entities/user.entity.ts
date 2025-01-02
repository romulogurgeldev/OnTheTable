import { Image } from '../../Class/image/Image';
import { Address } from '../../Class/addresses/entities/address.entity';


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    email: string;
    @Prop()
    telefone: string;
    @Prop()    
    name: string;
    @Prop()    
    foto: Image;
    @Prop()
    password: string;
    @Prop()
    cpf: string;
    @Prop()
    birthday: string;
    @Prop()
    address: Address
    @Prop()
    category: string
    @Prop()
    code: string

}

export const UserSchema = SchemaFactory.createForClass(User);
