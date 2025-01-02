import { Image } from '../../Class/image/Image';
import mongoose from 'mongoose';
import { Address } from '../../Class/addresses/entities/address.entity';

export class CreateUserDto {
    email: string;
    telefone: string;
    foto: Image;
    name: string;
    password: string;
    cpf: string;
    birthday: string;
    plano: string;
    address: Address;
    category: string;
    code: string;
}
