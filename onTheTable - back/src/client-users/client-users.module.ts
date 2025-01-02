import { Module } from '@nestjs/common';
import { ClientUsersService } from './client-users.service';
import { ClientUsersController } from './client-users.controller';

@Module({
  controllers: [ClientUsersController],
  providers: [ClientUsersService]
})
export class ClientUsersModule {}
