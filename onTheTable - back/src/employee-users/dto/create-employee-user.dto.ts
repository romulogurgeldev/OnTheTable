import { Permissao } from './../../permissao/permissao';
import { User } from './../../users/entities/user.entity';
import mongoose from "mongoose";

export class CreateEmployeeUserDto {
    user: mongoose.Schema.Types.ObjectId;
    userBoss: mongoose.Schema.Types.ObjectId
    restaurant: mongoose.Schema.Types.ObjectId
    cargo: string;
    horaEntrada: string;
    horaSaida: string;
    semana: string;
    status: string[];
    permissao: Permissao;
    
}
