import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food, FoodDocument } from './entities/food.entity';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food.name) private FoodModel: Model<FoodDocument>) {}
  create(createFoodDto: CreateFoodDto) {
    const Food = new this.FoodModel(createFoodDto);
    return Food.save();
  }

  findAll(limit: number, page: number) {
    return this.FoodModel.find().skip(page).limit(limit).exec();

  }
  findAllByCategory(id: string, limit: number, page: number, ordem: number = -1, title = "name") {
    const sorts = {[title]: ordem}
    return this.FoodModel.find(
      { categories : { $in : [id] }}
    ).skip(page).limit(limit).sort(sorts).exec();

  }
  findAllByCategoryNoPage(id: string) {

    return this.FoodModel.find(
      { categories : { $in : [id] }}
    ).exec();

  }
  findAllByRestaurant(id: string) {
    
    return this.FoodModel.find(
      { restaurant : { $in : [id] }}
    ).exec();

  }

  findOne(id: string) {
    return this.FoodModel.findById(id);
  }

  update(id: string, updateFoodDto: UpdateFoodDto) {
  
    return this.FoodModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateFoodDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.FoodModel.deleteOne({
      _id:id,
    }).exec();
  }
  removeByCategory(id: string) {
    return this.FoodModel.deleteMany({category: id})

  }
}
