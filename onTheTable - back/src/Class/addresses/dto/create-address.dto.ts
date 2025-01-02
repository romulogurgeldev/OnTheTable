import mongoose from "mongoose";

export class CreateAddressDto {
    address: string;
    complement: string;
    uf: string;
    cep: string;
    numberAddress: string;
    city: string;
    telphone: string
    bairro: string
}
