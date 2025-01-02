import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderTablesService } from './order-tables.service';
import { CreateOrderTableDto } from './dto/create-order-table.dto';
import { UpdateOrderTableDto } from './dto/update-order-table.dto';

@Controller('order-tables')
export class OrderTablesController {
  constructor(private readonly orderTablesService: OrderTablesService) {}

  @Post()
  create(@Body() createOrderTableDto: CreateOrderTableDto) {
    
    return this.orderTablesService.create(createOrderTableDto);
  }

  @Get()
  findAll() {
    return this.orderTablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTablesService.findOne(id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderTableDto: UpdateOrderTableDto) {
    
    return this.orderTablesService.update(id, updateOrderTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTablesService.remove(id);
  }
}
