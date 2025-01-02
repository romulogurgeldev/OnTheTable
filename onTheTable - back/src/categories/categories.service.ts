import { FoodsService } from './../foods/foods.service';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private foodsService: FoodsService,
    @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>) {}
  create(createCategoryDto: CreateCategoryDto) {
    const Category = new this.CategoryModel(createCategoryDto);
    return Category.save();
  }

  findAll(limit: number, page: number) {
    return this.CategoryModel.find().skip(page).limit(limit).exec();;

  }

  findOne(id: string) {
    return this.CategoryModel.findById(id);

    

  }
  findAllByCategory(id: string, tipo:string, limit: number, page: number) {

    return this.CategoryModel.find(
      { restaurant : { $in : [id] }, type : { $in : [tipo] }}
    ).skip(page).limit(limit).populate({
      path: 'restaurant', select: ['_id','name', 'price']
    }).sort({quantityPerFoodMin: -1}).exec();;

    

  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.CategoryModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateCategoryDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.CategoryModel.deleteOne({
      _id:id,
    }).exec();
  }
  async removeByRestaurant(id: string) {
    const categories = await this.CategoryModel.find({restaurant: id});

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].type == "comida"){
        this.foodsService.removeByCategory(categories[i]._id)
      }
      else if (categories[i].type == "complemento"){
        
      }
      else if (categories[i].type == "mesa"){
        
      }
    }
    // return this.CategoryModel.deleteMany({restaurant: id})

  }
}
