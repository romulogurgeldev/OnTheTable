import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdmUsersService } from './adm-users.service';
import { CreateAdmUserDto } from './dto/create-adm-user.dto';
import { UpdateAdmUserDto } from './dto/update-adm-user.dto';

@Controller('adm-users')
export class AdmUsersController {
  constructor(private readonly admUsersService: AdmUsersService) {}

  @Post()
  create(@Body() createAdmUserDto: CreateAdmUserDto) {
    return this.admUsersService.create(createAdmUserDto);
  }

  @Get()
  findAll() {
    return this.admUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.admUsersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdmUserDto: UpdateAdmUserDto) {
    return this.admUsersService.update(id, updateAdmUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.admUsersService.remove(id);
  }
}
