import { Model } from 'mongoose';
import { AdmUser, AdmUserDocument } from './entities/adm-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdmUserDto } from './dto/create-adm-user.dto';
import { UpdateAdmUserDto } from './dto/update-adm-user.dto';

@Injectable()
export class AdmUsersService {
  constructor(@InjectModel(AdmUser.name) private userModel: Model<AdmUserDocument>) {}
  create(createUserDto: CreateAdmUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find().populate({
      path: 'user',
    }).exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }
  findByEmail(email: string) {
    return this.userModel.findOne({email}).exec();
  }

  update(id: string, updateAdmUserDto: UpdateAdmUserDto) {
    return this.userModel.findByIdAndUpdate({
      _id: id
    },
    {
      updateAdmUserDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({
      _id:id,
    }).exec();
  }
}
