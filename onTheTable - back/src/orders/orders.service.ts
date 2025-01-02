import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderModel: Model<OrderDocument>) {}
  create(createOrderDto: CreateOrderDto) {
    createOrderDto.orderNumber = this.gerarOrderNumber();
    createOrderDto.originalPrice =  this.calculaTotal(createOrderDto.orderFood)
    const Order = new this.OrderModel(createOrderDto);
    return Order.save();
  }

  findAll() {
    return this.OrderModel.find().exec();

  }
  findAllByStatus(status: number) {

    let statusEscolhido = "Aguardando confirmação...";
    if (status == 0){
      statusEscolhido = "Pedido cancelado"
    }
    else if (status == 1){
      statusEscolhido = "Aguardando confirmação..."
    }
    else if (status == 2){
      statusEscolhido = "Preparando pedido"
    }
    else if (status == 3){
      statusEscolhido = "Pedido pronto"
    }
    else if (status == 4){
      statusEscolhido = "Pedido entregue"
    }
    else if (status == 5){
      statusEscolhido = "Pedido finalizado"
    }
    else if (status == 6){
      return this.OrderModel.find().populate({
        path: 'table',
      }).exec();
    }
    return this.OrderModel.find({status: statusEscolhido}).populate({
      path: 'table',
    }).exec();

  }

  findOne(id: string) {
    return this.OrderModel.findById(id);
  }
  findOneActive(id: string) {
    return this.OrderModel.find({     $and: [
      {active: true },
      {table: id}
  ]});
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.OrderModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateOrderDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.OrderModel.deleteOne({
      _id:id,
    }).exec();
  }

  gerarOrderNumber () {
    let resultado: string = "";

    for (let i = 0; i < 6; ++i) {
       resultado = resultado + Math.floor(Math.random() * 10 ).toString();
    }
    return resultado;
  } 
  calculaTotal(orderFood){
    let total = 0;
    for (let i = 0; i < orderFood.length; i++) {
      let somaComplementos = this.calculaComplementos(orderFood[i])
      total = total + ((orderFood[i].priceFood + somaComplementos) * orderFood[i].quantidade);
      
    }
    return total;
  }
  calculaComplementos(cart: any){
    let somaComplementos = 0;
    for (let j = 0; j < cart.complementos.length; j++) {
      somaComplementos = somaComplementos + cart.complementos[j].quantidade * cart.complementos[j].price
      
    }
    return somaComplementos
  }
  removeByRestaurant(id: string) {
    return this.OrderModel.deleteMany({restaurant: id})

  }
}
