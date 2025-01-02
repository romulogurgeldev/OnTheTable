import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ConfigDocument = Config & Document;

@Schema()
export class Config {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop()
    chat: boolean;
    @Prop()
    servicos: boolean;
    @Prop()
    pagamento: boolean;
    @Prop()
    balcao: boolean;
    @Prop()
    delivery: boolean;
    @Prop()
    cupons: boolean;
    @Prop()
    reservation: boolean;

}
export const ConfigSchema = SchemaFactory.createForClass(Config);
