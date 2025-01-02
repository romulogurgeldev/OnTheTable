import { NotificationsService } from './../notifications/notifications.service';
import { ClienteMesa } from '../Class/clienteMesa/clienteMesa';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { encurtaUrl } from 'src/utils/shortLink/shortLink';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService, private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createTableDto: CreateTableDto) {
    let result: any = await this.tablesService.create(createTableDto);

    // result.url = await encurtaUrl(createTableDto.url+result.code);
    result.url = createTableDto.url+result.code;
    return this.tablesService.update(result._id, result);
  }

  @Get(":limit/:page")
  findAll(@Param('limit') limit: number, @Param('page') page: number) {
    return this.tablesService.findAll(limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }
  @Get('by/code/:code')
  findOneByCode(@Param('code') code: string) {

    return this.tablesService.findOneByCode(code);
  }

  @Get('category/:id/:limit/:page/:ordem/:title')
  findAllByCategory(@Param('id') id: string, @Param('limit') limit: number, @Param('page') page: number, 
  @Param('ordem') ordem: number, @Param('title') title: string) {

    if(ordem && title){
      return this.tablesService.findAllByCategory(id, limit, page, ordem, title);

    }
    return this.tablesService.findAllByCategory(id, limit, page);
  }
  @Get('restaurant/:id/:limit/:page/:ordem/:title')
  findAllByRestaurant(@Param('id') id: string, @Param('limit') limit: number, @Param('page') page: number, 
  @Param('ordem') ordem: number, @Param('title') title: string) {

    if(ordem && title){
      return this.tablesService.findAllByRestaurant(id, limit, page, ordem, title);

    }
    return this.tablesService.findAllByRestaurant(id, limit, page);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(id, updateTableDto);
  }
  @Patch('checkin/:id')
  async checkin(@Param('id') id: string, @Body() newParticipante: any ) {

    const temParticipante: any = await this.tablesService.findOne(id);
    if (temParticipante.participantes.length==0){
      newParticipante.leader = true;
    }
    
    const result:any = await this.tablesService.checkin(id, newParticipante);
    const dados: CreateNotificationDto = {
      restaurant: result.restaurant,
      table: result._id,
      type: "mesa",
      msg: "tem cliente.",
      lida: false,
      notificou: false,
      createdAt: new Date(),

    }
    await this.notificationsService.create(dados);
    return result;
  }
  @Get('participante/:id/:user')
  async findParticipante(@Param('id') id: string, @Param('user') user: string) {


    return await this.tablesService.findParticipante(id, user);
  }
  @Patch('cart/:id')
  async cart(@Param('id') id: string, @Body() newProduto: any ) {
    const result = await this.tablesService.cart(id, newProduto);
    return result;
  }
  @Delete('cart/:id/:index')
  async cartRemove(@Param('id') id: string, @Param('index') index: number  ) {
    const result = await this.tablesService.RemoveCart(id, index);
    return result;
  }
  @Patch('cart/:id/:index')
  async cartEdit(@Param('id') id: string, @Param('index') index: number, @Body() valor: any ) {
    const numero = parseInt(valor.valor);
    const result = await this.tablesService.EditCart(id, index, numero);
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}
