import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderTableDto } from './dto/create-order-table.dto';
import { UpdateOrderTableDto } from './dto/update-order-table.dto';
import { OrderTable, OrderTableDocument } from './entities/order-table.entity';

@Injectable()
export class OrderTablesService {
  constructor(@InjectModel(OrderTable.name) private OrderTableModel: Model<OrderTableDocument>) {}
  create(createOrderTableDto: CreateOrderTableDto) {
    console.log(createOrderTableDto)
    const OrderTable = new this.OrderTableModel(createOrderTableDto);
    console.log(this.OrderTableModel)
    return OrderTable.save();
  }

  findAll() {
    return this.OrderTableModel.find().exec();

  }

  findOne(id: string) {
    return this.OrderTableModel.findById(id);
  }

  update(id: string, updateOrderTableDto: UpdateOrderTableDto) {
    
    return this.OrderTableModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateOrderTableDto
    },
    {
      new: true
    }
    
    );
  }
  

  remove(id: string) {
    return this.OrderTableModel.deleteOne({
      _id:id,
    }).exec();
  }
  removeByRestaurant(id: string) {
    return this.OrderTableModel.deleteMany({restaurant: id})

  }
}
