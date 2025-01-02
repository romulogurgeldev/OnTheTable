import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private CartModel: Model<CartDocument>) {}
  create(createCartDto: CreateCartDto) {
    const Cart = new this.CartModel(createCartDto);
    return Cart.save();
  }

  findAll() {
    return this.CartModel.find().exec();;

  }

  findOne(id: string) {
    return this.CartModel.findById(id);

    

  }
  findOnePublic(id: string) {
    return this.CartModel.findById(id);

    

  }
  findOneByAdm(id: string) {
    return this.CartModel.find(
      { userAdm : { $in : [id] }}
    );

    

  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.CartModel.findByIdAndUpdate({
      _id: id
    },
    {
      updateCartDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.CartModel.deleteOne({
      _id:id,
    }).exec();
  }
}
