import { AdmUsersModule } from './../adm-users/adm-users.module';
import { AdmUsersService } from './../adm-users/adm-users.service';

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { EmployeeUsersModule } from 'src/employee-users/employee-users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AdmUsersModule, EmployeeUsersModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
