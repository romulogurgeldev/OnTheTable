import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { Plano, PlanoDocument } from './entities/plano.entity';

@Injectable()
export class PlanosService {
  constructor(@InjectModel(Plano.name) private PlanoModel: Model<PlanoDocument>) {}
  create(createPlanoDto: CreatePlanoDto) {
    const Plano = new this.PlanoModel(createPlanoDto);
    return Plano.save();
  }

  findAll(limit: number = 1000, page: number = 0) {
    return this.PlanoModel.find().skip(page).limit(limit).exec();

  }
  findAllByCategory(id: string, limit: number, page: number, ordem: number = -1, title = "name") {
    const sorts = {[title]: ordem}
    return this.PlanoModel.find(
      { categories : { $in : [id] }}
    ).skip(page).limit(limit).sort(sorts).exec();

  }
  findAllByCategoryNoPage(id: string) {

    return this.PlanoModel.find(
      { categories : { $in : [id] }}
    ).exec();

  }
  findAllByRestaurant(id: string) {
    
    return this.PlanoModel.find(
      { restaurant : { $in : [id] }}
    ).exec();

  }

  findOne(id: string) {
    return this.PlanoModel.findById(id);
  }

  update(id: string, updatePlanoDto: UpdatePlanoDto) {
  
    return this.PlanoModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updatePlanoDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.PlanoModel.deleteOne({
      _id:id,
    }).exec();
  }
}
