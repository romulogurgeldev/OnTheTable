import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtributosComidasService } from './atributos-comidas.service';
import { CreateAtributosComidaDto } from './dto/create-atributos-comida.dto';
import { UpdateAtributosComidaDto } from './dto/update-atributos-comida.dto';

@Controller('atributos-comidas')
export class AtributosComidasController {
  constructor(private readonly atributosComidasService: AtributosComidasService) {}

  @Post()
  create(@Body() createAtributosComidaDto: CreateAtributosComidaDto) {
    return this.atributosComidasService.create(createAtributosComidaDto);
  }

  @Get()
  findAll() {
    return this.atributosComidasService.findAll();
  }
  @Get(":food/:category")
  findAllByFoodAndCategory(@Param('food') food: string, @Param('category') category: string) {
    return this.atributosComidasService.findAllByFoodAndCategory(food, category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atributosComidasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtributosComidaDto: UpdateAtributosComidaDto) {
    return this.atributosComidasService.update(id, updateAtributosComidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atributosComidasService.remove(id);
  }
}
