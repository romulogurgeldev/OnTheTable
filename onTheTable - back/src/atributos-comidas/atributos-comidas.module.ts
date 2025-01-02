import { Module } from '@nestjs/common';
import { AtributosComidasService } from './atributos-comidas.service';
import { AtributosComidasController } from './atributos-comidas.controller';
import { AtributosComida, AtributosComidaSchema } from './entities/atributos-comida.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: AtributosComida.name, schema: AtributosComidaSchema }])],
  controllers: [AtributosComidasController],
  providers: [AtributosComidasService]
})
export class AtributosComidasModule {}
