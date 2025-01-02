import mongoose from "mongoose";

export class CreateAdmUserDto {
    user: mongoose.Schema.Types.ObjectId;
    plano: string;
    
}
