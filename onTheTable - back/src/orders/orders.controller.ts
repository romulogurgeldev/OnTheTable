import { NotificationsService } from './../notifications/notifications.service';
import { CreateNotificationDto } from './../notifications/dto/create-notification.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService, private notificationService: NotificationsService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const dados: CreateNotificationDto = {
      restaurant: createOrderDto.restaurant,
      table: createOrderDto.table,
      type: "cozinha",
      msg: "fez um pedido.",
      lida: false,
      notificou: false,
      createdAt: new Date(),

    }
    await this.notificationService.create(dados);
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get("status/:status")
  findAllByStatus(@Param('status') status: number) {
    return this.ordersService.findAllByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
  @Get('active/:id')
  findOneActive(@Param('id') id: string) {
    return this.ordersService.findOneActive(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    console.log("editou")
    console.log(updateOrderDto)
    const dados: CreateNotificationDto = {
      restaurant: updateOrderDto.restaurant,
      table: updateOrderDto.table,
      type: "cozinha",
      msg:  updateOrderDto.status +" "+ updateOrderDto.orderNumber,
      lida: false,
      notificou: false,
      createdAt: new Date(),

    }
    console.log(dados)
    await this.notificationService.create(dados);

    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
