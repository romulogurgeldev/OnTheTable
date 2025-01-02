import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Config, ConfigDocument } from './entities/config.entity';

@Injectable()
export class ConfigsService {
  constructor(@InjectModel(Config.name) private configModel: Model<ConfigDocument>) {}
  async create(createConfigDto: CreateConfigDto) {
    const Config = new this.configModel(createConfigDto);
    return Config.save();
  }

  findAll() {
    return this.configModel.find().populate({
      path: 'userBoss',
    }).populate({
      path: 'user',
    }).exec();
  }

  findOne(id: string) {
    return this.configModel.findById(id);
  }
  async findByRestaurant(restaurant: any) {
    const result = await this.configModel.findOne({restaurant}).exec();
    if (result){
      return result;

    }
    else{
      const dados: CreateConfigDto = {
        restaurant: restaurant,
        chat: true,
        servicos: true,
        pagamento: true,
        balcao: true,
        cupons: true,
        delivery: true,
        reservation: true,
      }
      const result2 = await this.create(dados);
      return result2;
    }
  }
  findByBoss(userBoss: string) {
    return this.configModel.find({userBoss}).populate({
      path: 'user',
    }).populate({
      path: 'restaurant'
    }).exec();
  }

  update(id: string, updateConfigDto: UpdateConfigDto) {
    return this.configModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateConfigDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.configModel.deleteOne({
      _id:id,
    }).exec();
  }
  removeByRestaurant(id: string) {
    return this.configModel.deleteMany({restaurant: id})

  }
}
