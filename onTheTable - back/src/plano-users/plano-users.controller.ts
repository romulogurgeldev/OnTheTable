import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanoUsersService } from './plano-users.service';
import { CreatePlanoUserDto } from './dto/create-plano-user.dto';
import { UpdatePlanoUserDto } from './dto/update-plano-user.dto';

@Controller('plano-users')
export class PlanoUsersController {
  constructor(private readonly planoUsersService: PlanoUsersService) {}

  @Post()
  create(@Body() createPlanoUserDto: CreatePlanoUserDto) {
    return this.planoUsersService.create(createPlanoUserDto);
  }

  @Get()
  findAll() {
    return this.planoUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planoUsersService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanoUserDto: UpdatePlanoUserDto) {
    return this.planoUsersService.update(id, updatePlanoUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planoUsersService.remove(id);
  }
}
