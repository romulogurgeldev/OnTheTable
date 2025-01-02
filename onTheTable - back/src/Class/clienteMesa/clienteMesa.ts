import mongoose from "mongoose";

export class ClienteMesa {
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    leader: boolean;
}