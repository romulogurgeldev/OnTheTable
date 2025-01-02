import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationDocument } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(@InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>) {}
  create(createReservationDto: CreateReservationDto) {
    const Reservation = new this.ReservationModel(createReservationDto);
    return Reservation.save();
  }

  findAll() {
    return this.ReservationModel.find().exec();

  }
  findAllByUser(user: any) {
    return this.ReservationModel.find({user}).populate({path: "user"}).populate({path: "restaurant"}).populate({path: "table"}).sort({date: 1}).exec();

  }
  findAllByRestaurant(restaurant: any) {
    return this.ReservationModel.find({restaurant}).populate({path: "user"}).populate({path: "restaurant"}).populate({path: "table"}).sort({status: 1}).sort({date: 1}).exec();

  }

  findOne(id: string) {
    return this.ReservationModel.findById(id);
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.ReservationModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateReservationDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.ReservationModel.deleteOne({
      _id:id,
    }).exec();
  }
  removeByRestaurant(id: string) {
    return this.ReservationModel.deleteMany({restaurant: id})

  }
}
