import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderFoodDto } from './dto/create-order-food.dto';
import { UpdateOrderFoodDto } from './dto/update-order-food.dto';
import { OrderFood, OrderFoodDocument } from './entities/order-food.entity';

@Injectable()
export class OrderFoodsService {
  constructor(@InjectModel(OrderFood.name) private OrderFoodModel: Model<OrderFoodDocument>) {}
  create(createOrderFoodDto: CreateOrderFoodDto) {
    const OrderFood = new this.OrderFoodModel(createOrderFoodDto);
    return OrderFood.save();
  }

  findAll() {
    return this.OrderFoodModel.find().exec();

  }

  findOne(id: string) {
    return this.OrderFoodModel.findById(id);
  }

  update(id: string, updateOrderFoodDto: UpdateOrderFoodDto) {
    return this.OrderFoodModel.findByIdAndUpdate({
      _id: id
    },
    {
      updateOrderFoodDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.OrderFoodModel.deleteOne({
      _id:id,
    }).exec();
  }
}
