
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, AddressDocument } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(@InjectModel(Address.name) private userModel: Model<AddressDocument>) {}
  create(createUserDto: CreateAddressDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.userModel.findByIdAndUpdate({
      _id: id
    },
    {
      updateAddressDto
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
