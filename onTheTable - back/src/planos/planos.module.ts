import { Module } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { PlanosController } from './planos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plano, PlanoSchema } from './entities/plano.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Plano.name, schema: PlanoSchema }])],
  controllers: [PlanosController],
  providers: [PlanosService]
})
export class PlanosModule {}
