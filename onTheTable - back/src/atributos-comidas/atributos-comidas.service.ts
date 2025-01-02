import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAtributosComidaDto } from './dto/create-atributos-comida.dto';
import { UpdateAtributosComidaDto } from './dto/update-atributos-comida.dto';
import { AtributosComida, AtributosComidaDocument } from './entities/atributos-comida.entity';

@Injectable()
export class AtributosComidasService {
  constructor(@InjectModel(AtributosComida.name) private AtributosComidaModel: Model<AtributosComidaDocument>) {}
  create(createAtributosComidaDto: CreateAtributosComidaDto) {
    const AtributosComida = new this.AtributosComidaModel(createAtributosComidaDto);
    return AtributosComida.save();
  }

  findAll(limit: number = 1000, page: number = 0) {
    return this.AtributosComidaModel.find().skip(page).limit(limit).exec();;

  }
  
  findAllByFoodAndCategory(idFood, category) {
    return this.AtributosComidaModel.find({ food : { $in : [idFood] }, category : { $in : [category] }}).exec();;

  }

  findOne(id: string) {
    return this.AtributosComidaModel.findById(id);

    

  }


  update(id: string, updateAtributosComidaDto: UpdateAtributosComidaDto) {
    return this.AtributosComidaModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateAtributosComidaDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.AtributosComidaModel.deleteOne({
      _id:id,
    }).exec();
  }
  removeByRestaurant(id: string) {
    return this.AtributosComidaModel.deleteMany({restaurant: id})

  }
}
