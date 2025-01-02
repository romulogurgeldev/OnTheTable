import { NotificationsModule } from './../notifications/notifications.module';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), NotificationsModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
