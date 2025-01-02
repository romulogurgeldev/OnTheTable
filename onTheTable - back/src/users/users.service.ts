import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encodedPassword } from 'src/utils/bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto) {
    const password = encodedPassword(createUserDto.password);
    const user = new this.userModel({...createUserDto, password});
    return user.save();
  }

  findAll() {
    return this.userModel.find({},{password: 0}).exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id, {password: 0});
  }
  findByEmail(email: string) {
    return this.userModel.findOne({email}, {password: 0}).exec();
  }
  findByTelefone(telefone: string) {
    return this.userModel.findOne({telefone}, {password: 0}).exec();
  }
  findByEmailPassword(email: string) {
    return this.userModel.findOne({email}).exec();
  }
  async findByTelefonePassword(telefone: string) {
    console.log("telefone service", telefone)
    return await this.userModel.findOne({telefone}).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password){
      updateUserDto.password = encodedPassword(updateUserDto.password);

    }
    return this.userModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateUserDto
    },
    {
      new: true
    }
    
    );
  }
  updatePassword(id: string, password: string) {
    password = encodedPassword(password);

    
    return this.userModel.findByIdAndUpdate({
      _id: id
    },
    {
      password: password
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

  async geraCode(id: string){
    const digito1 = Math.floor(10* Math.random());
    const digito2 = Math.floor(10* Math.random());
    const digito3 = Math.floor(10* Math.random());
    const digito4 = Math.floor(10* Math.random());

    const result = digito1.toString() + digito2.toString() + digito3.toString() + digito4.toString();
    const code: UpdateUserDto = {
      code: result
    }
    await this.update(id, code);
    return result;
  }

  verificaCode(id: string, code: string){
    return this.userModel.findOne({id, code}, {password: 0}).exec();
  }
}
