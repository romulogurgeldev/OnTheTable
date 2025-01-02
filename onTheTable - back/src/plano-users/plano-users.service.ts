import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlanoUserDto } from './dto/create-plano-user.dto';
import { UpdatePlanoUserDto } from './dto/update-plano-user.dto';
import { PlanoUser, PlanoUserDocument } from './entities/plano-user.entity';

@Injectable()
export class PlanoUsersService {
  constructor(@InjectModel(PlanoUser.name) private PlanoUserModel: Model<PlanoUserDocument>) {}
  create(createPlanoDto: CreatePlanoUserDto) {
    const PlanoUser = new this.PlanoUserModel(createPlanoDto);
    return PlanoUser.save();
  }

  findAll(limit: number = 1000, page: number = 0) {
    return this.PlanoUserModel.find().skip(page).limit(limit).exec();

  }
  findAllByCategory(id: string, limit: number, page: number, ordem: number = -1, title = "name") {
    const sorts = {[title]: ordem}
    return this.PlanoUserModel.find(
      { categories : { $in : [id] }}
    ).skip(page).limit(limit).sort(sorts).exec();

  }
  findAllByCategoryNoPage(id: string) {

    return this.PlanoUserModel.find(
      { categories : { $in : [id] }}
    ).exec();

  }
  findAllByRestaurant(id: string) {
    
    return this.PlanoUserModel.find(
      { restaurant : { $in : [id] }}
    ).exec();

  }

  findOne(id: string) {
    return this.PlanoUserModel.findOne({ user : { $in : [id] }}).populate({path: "plano"});
  }

  update(id: string, updatePlanoUserDto: UpdatePlanoUserDto) {
  
    return this.PlanoUserModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updatePlanoUserDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.PlanoUserModel.deleteOne({
      _id:id,
    }).exec();
  }
}
