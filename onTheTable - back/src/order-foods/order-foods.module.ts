import { OrderFood, OrderFoodSchema } from './entities/order-food.entity';
import { Module } from '@nestjs/common';
import { OrderFoodsService } from './order-foods.service';
import { OrderFoodsController } from './order-foods.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderFood.name, schema: OrderFoodSchema }])],
  controllers: [OrderFoodsController],
  providers: [OrderFoodsService]
})
export class OrderFoodsModule {}
