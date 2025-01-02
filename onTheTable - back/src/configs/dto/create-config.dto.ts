import mongoose from "mongoose";

export class CreateConfigDto {
    restaurant: mongoose.Schema.Types.ObjectId
    chat: boolean;
    servicos: boolean;
    pagamento: boolean;
    balcao: boolean;
    delivery: boolean;
    cupons: boolean;
    reservation: boolean;
}
