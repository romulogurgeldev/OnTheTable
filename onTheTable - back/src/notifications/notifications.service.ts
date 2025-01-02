import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification, NotificationDocument } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private NotificationModel: Model<NotificationDocument>) {}
  create(createNotificationDto: CreateNotificationDto) {
    const Notification = new this.NotificationModel(createNotificationDto);
    return Notification.save();
  }

  findAll(limit: number = 1000, page: number = 0) {
    return this.NotificationModel.find().skip(page).limit(limit).exec();

  }
  findAllByRestaurant(idRestaurant: string) {
    
    return this.NotificationModel.find(
      { restaurant: idRestaurant}
    ).populate({path: "table"}).exec();

  }
  findAllByCategory(id: string, limit: number, page: number, ordem: number = -1, title = "name") {
    const sorts = {[title]: ordem}
    return this.NotificationModel.find(
      { categories : { $in : [id] }}
    ).skip(page).limit(limit).sort(sorts).exec();

  }
  findAllByCategoryNoPage(id: string) {

    return this.NotificationModel.find(
      { categories : { $in : [id] }}
    ).exec();

  }


  findOne(id: string) {
    return this.NotificationModel.findById(id);
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
  
    return this.NotificationModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateNotificationDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.NotificationModel.deleteOne({
      _id:id,
    }).exec();
  }
}
