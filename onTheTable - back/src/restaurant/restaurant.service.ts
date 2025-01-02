import { CategoriesService } from 'src/categories/categories.service';
import { Restaurant, RestaurantDocument } from './entities/restaurant.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    private categoriesService: CategoriesService,
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>) {}
  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = new this.restaurantModel(createRestaurantDto);
    return restaurant.save();
  }

  findAll() {
    return this.restaurantModel.find().populate({
      path: 'employees', select: ['name', 'cpf'], match: { name: { $in: 'Felipe 2' }},
    }).exec();;

  }

  findOne(id: string) {
    return this.restaurantModel.findById(id);
  }
  findOnePublic(id: string) {
    return this.restaurantModel.findById(id);
  }
  findByAdm(id: string) {
    return this.restaurantModel.find(
      { userAdm : { $in : [id] }}
    );
  }

  update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateRestaurantDto
    },
    {
      new: true
    }
    
    );
  }

  async remove(id: string) {
    // await this.categoriesService.removeByRestaurant(id);
    

    return this.restaurantModel.deleteOne({
      _id:id,
    }).exec();
  }
}

// AKIAQYJ7YKR2B666UMCQ  pass = +KFREOE2gIwdgIAPRtWGdNaz2wwBwO2HsmgX0vKv