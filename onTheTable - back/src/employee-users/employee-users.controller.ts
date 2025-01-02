import { JwtAuthGuard } from './../auth/shared/jwt-auth.guard';

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeeUsersService } from './employee-users.service';
import { CreateEmployeeUserDto } from './dto/create-employee-user.dto';
import { UpdateEmployeeUserDto } from './dto/update-employee-user.dto';
import { UsersService } from 'src/users/users.service';
JwtAuthGuard

@Controller('employee-users')
export class EmployeeUsersController {
  constructor(private readonly employeeUsersService: EmployeeUsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEmployeeUserDto: CreateEmployeeUserDto) {
    return this.employeeUsersService.create(createEmployeeUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.employeeUsersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeUsersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('boss/:id')
  findByBoss(@Param('id') id: string) {
    return this.employeeUsersService.findByBoss(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeUserDto: UpdateEmployeeUserDto) {
    return this.employeeUsersService.update(id, updateEmployeeUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    // const user: any = this.employeeUsersService.findOne(id);
    // this.usersService.remove(user.user._id);
    return this.employeeUsersService.remove(id);
  }
}
