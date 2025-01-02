import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeUserDto } from './dto/create-employee-user.dto';
import { UpdateEmployeeUserDto } from './dto/update-employee-user.dto';
import { EmployeeUser, EmployeeUserDocument } from './entities/employee-user.entity';

@Injectable()
export class EmployeeUsersService {
  constructor(@InjectModel(EmployeeUser.name) private userModel: Model<EmployeeUserDocument>) {}
  create(createUserDto: CreateEmployeeUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find().populate({
      path: 'userBoss',
    }).populate({
      path: 'user',
    }).exec();
  }

  findOne(user: string) {
    return this.userModel.findOne({user});
  }
  findByEmail(email: string) {
    return this.userModel.findOne({email}).exec();
  }
  findByBoss(userBoss: string) {
    return this.userModel.find({userBoss}).populate({
      path: 'user',
    }).populate({
      path: 'restaurant'
    }).exec();
  }

  update(id: string, updateEmployeeUserDto: UpdateEmployeeUserDto) {
    return this.userModel.findByIdAndUpdate({
      _id: id
    },
    {
      updateEmployeeUserDto
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
  removeByRestaurant(id: string) {
    return this.userModel.deleteMany({restaurant: id})

  }
}
