import { Image } from '../../Class/image/Image';
import { Address } from '../../Class/addresses/entities/address.entity';
import mongoose from "mongoose";

export class CreateRestaurantDto {
    userAdm: mongoose.Schema.Types.ObjectId;
    foto: Image;
    address: Address;
    name: string;
    cnpj: string;
    razaoSocial: string;
    employees: Array<mongoose.Schema.Types.ObjectId>;
    telefone: string;
    status: boolean;
    
}
    
