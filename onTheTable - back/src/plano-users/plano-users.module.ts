import { PlanoUser, PlanoUserSchema } from './entities/plano-user.entity';
import { Module } from '@nestjs/common';
import { PlanoUsersService } from './plano-users.service';
import { PlanoUsersController } from './plano-users.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: PlanoUser.name, schema: PlanoUserSchema }])],
  controllers: [PlanoUsersController],
  providers: [PlanoUsersService]
})
export class PlanoUsersModule {}
