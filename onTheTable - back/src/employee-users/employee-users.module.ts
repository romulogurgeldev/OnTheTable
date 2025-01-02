import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeUsersService } from './employee-users.service';
import { EmployeeUsersController } from './employee-users.controller';
import { EmployeeUser, EmployeeUserSchema } from './entities/employee-user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: EmployeeUser.name, schema: EmployeeUserSchema }])],
  controllers: [EmployeeUsersController],
  providers: [EmployeeUsersService],
  exports: [EmployeeUsersService],
})
export class EmployeeUsersModule {}
