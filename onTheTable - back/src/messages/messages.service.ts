import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message, MessageDocument } from './entities/message.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private MessageModel: Model<MessageDocument>) {}
  create(createMessageDto: CreateMessageDto) {
    const Message = new this.MessageModel(createMessageDto);
    return Message.save();
  }

  findAll() {
    return this.MessageModel.find().exec();

  }
  findAllByCategory(id: string, limit: number, page: number, ordem: number = -1, title = "name") {
    const sorts = {[title]: ordem}
    return this.MessageModel.find(
      { categories : { $in : [id] }}
    ).skip(page).limit(limit).sort(sorts).exec();

  }
  findAllByCategoryNoPage(id: string) {

    return this.MessageModel.find(
      { categories : { $in : [id] }}
    ).exec();

  }
  findMessagesMesa(id: string) {
    
    return this.MessageModel.findOne(
      { mesa: { $in : [id] }, status: { $in : [true] }}
    ).exec();

  }

  findOne(id: string) {
    return this.MessageModel.findById(id);
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
  
    return this.MessageModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateMessageDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.MessageModel.deleteOne({
      _id:id,
    }).exec();
  }
  removeByRestaurant(id: string) {
    return this.MessageModel.deleteMany({restaurant: id})

  }
}
