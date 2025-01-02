import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderFoodsService } from './order-foods.service';
import { CreateOrderFoodDto } from './dto/create-order-food.dto';
import { UpdateOrderFoodDto } from './dto/update-order-food.dto';

@Controller('order-foods')
export class OrderFoodsController {
  constructor(private readonly orderFoodsService: OrderFoodsService) {}

  @Post()
  create(@Body() createOrderFoodDto: CreateOrderFoodDto) {
    return this.orderFoodsService.create(createOrderFoodDto);
  }

  @Get()
  findAll() {
    return this.orderFoodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderFoodsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderFoodDto: UpdateOrderFoodDto) {
    return this.orderFoodsService.update(id, updateOrderFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderFoodsService.remove(id);
  }
}
