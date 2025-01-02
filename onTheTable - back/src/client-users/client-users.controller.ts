import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientUsersService } from './client-users.service';
import { CreateClientUserDto } from './dto/create-client-user.dto';
import { UpdateClientUserDto } from './dto/update-client-user.dto';

@Controller('client-users')
export class ClientUsersController {
  constructor(private readonly clientUsersService: ClientUsersService) {}

  @Post()
  create(@Body() createClientUserDto: CreateClientUserDto) {
    return this.clientUsersService.create(createClientUserDto);
  }

  @Get()
  findAll() {
    return this.clientUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientUserDto: UpdateClientUserDto) {
    return this.clientUsersService.update(+id, updateClientUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientUsersService.remove(+id);
  }
}
