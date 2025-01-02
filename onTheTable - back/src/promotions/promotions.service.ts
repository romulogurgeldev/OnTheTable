
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion, PromotionDocument } from './entities/promotion.entity';

@Injectable()
export class PromotionsService {
  constructor(@InjectModel(Promotion.name) private promotionModel: Model<PromotionDocument>) {}
  create(createPromotionDto: CreatePromotionDto) {
    const promotion = new this.promotionModel(createPromotionDto);
    return promotion.save();
  }

  findAll() {
    return this.promotionModel.find().exec();

  }

  findOne(id: string) {
    return this.promotionModel.findById(id);
  }
  findByRestaurant(restaurant: string) {
    return this.promotionModel.find({restaurant}).populate({
      path: 'foods',
    });
  }

  update(id: string, updatePromotionDto: UpdatePromotionDto) {
    return this.promotionModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updatePromotionDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.promotionModel.deleteOne({
      _id:id,
    }).exec();
  }
  removeByRestaurant(id: string) {
    return this.promotionModel.deleteMany({restaurant: id})

  }
}
