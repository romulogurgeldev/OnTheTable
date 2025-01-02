import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale, SaleDocument } from './entities/sale.entity';
import mongoose from 'mongoose';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sale.name) private SaleModel: Model<SaleDocument>) {}
  create(createSaleDto: CreateSaleDto) {
    const Sale = new this.SaleModel(createSaleDto);
    return Sale.save();
  }

  findAll() {
    return this.SaleModel.find().exec();

  }
  isExist(food: any, table: any, date: Date){
    return this.SaleModel.findOne({food, table, date}).exec();
  }

  findOne(id: string) {
    return this.SaleModel.findById(id);
  }

  update(id: string, updateSaleDto: UpdateSaleDto) {
    return this.SaleModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateSaleDto
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.SaleModel.deleteOne({
      _id:id,
    }).exec();
  }
  removeByRestaurant(id: string) {
    return this.SaleModel.deleteMany({restaurant: id})

  }

  async getByDateAllFood(restaurant: string, month: any = 0, year: any = 0, day: any = 0, limit: any = 5){
    // return this.SaleModel.find().populate({path: "food"}).exec();
    console.log('dentro')
    const data = new Date();
    month = month==0 ? data.getMonth()+1 : parseInt(month);
    year = year==0 ? data.getFullYear() : parseInt(year);
    day = day==0 ? data.getDate() : parseInt(day);

    console.log(month, year, day)
    const visualizacoes = await this.SaleModel.aggregate([
      {$match: {
        $and: [    
        { $expr: {$eq: [{$month: "$date"}, month]} },
        { $expr: {$eq: [{$year: "$date"}, year]} },
        { $expr: {$eq: [{$dayOfMonth: "$date"}, day]} },
        { restaurant: new mongoose.Types.ObjectId(restaurant) }
      ]
      }
    },

    {$group : {_id: {  food: "$food" }, 
      count:{$sum: "$quantidade"}},
    
    },
    { $sort : { count : -1 } },
    { $limit : limit }  

    ])   
       
   
    // let result = []
    // for (let i = 0; i < visualizacoes.length; i++) {
    //   result.push({date: visualizacoes[i]._id.date, count: visualizacoes[i].count, food: visualizacoes[i]._id.food});
    // }
    // let map = new Map(Array.from(result, obj => [obj["food"], []]));

    // result.forEach(obj => map.get(obj["food"]).push(obj));
    return Array.from(visualizacoes);
  }
  async getByDateAllTable(restaurant: string, month: any = 0, year: any = 0, day: any = 0, limit: any = 5){
    console.log('dentro')
    const data = new Date();
    month = month==0 ? data.getMonth()+1 : parseInt(month);
    year = year==0 ? data.getFullYear() : parseInt(year);
    day = day==0 ? data.getDate() : parseInt(day);
    const visualizacoes = await this.SaleModel.aggregate([
      {$match: {
        $and: [    
        { $expr: {$eq: [{$month: "$date"}, month]} },
        { $expr: {$eq: [{$year: "$date"}, year]} },
        { $expr: {$eq: [{$dayOfMonth: "$date"}, day]} },
        { restaurant: new mongoose.Types.ObjectId(restaurant) }
      ]
      }
    },
      {$group : {_id: { table: "$table" }, count:{$sum: "$price"}}},
      { $sort : { count : -1 } },
      { $limit : limit }  
    ])      
   
    // let result = []
    // for (let i = 0; i < visualizacoes.length; i++) {
    //   result.push({date: visualizacoes[i]._id.date, count: visualizacoes[i].count, table: visualizacoes[i]._id.table});
    // }
    // let map = new Map(Array.from(result, obj => [obj["date"], []]));

    // result.forEach(obj => map.get(obj["date"]).push(obj));
    return Array.from(visualizacoes);
  }
  async getByMonthAllFood(restaurant: string, month: any = 0, year: any = 0, limit: any = 5){
    console.log('dentro')
    const data = new Date();
    month = month==0 ? data.getMonth()+1 : parseInt(month);
    year = year==0 ? data.getFullYear() : parseInt(year);

    console.log(month, year)
    const visualizacoes = await this.SaleModel.aggregate([
      {$match: {
        $and: [    
        { $expr: {$eq: [{$month: "$date"}, month]} },
        { $expr: {$eq: [{$year: "$date"}, year]} },
        { restaurant: new mongoose.Types.ObjectId(restaurant) }
      ]
      }
    },
      {$group : {_id: { food: "$food" }, count:{$sum: "$quantidade"}}},
      { $sort : { count : -1 } },
      { $limit : limit }  

    ])      
   
    let result = []
    for (let i = 0; i < visualizacoes.length; i++) {
      result.push({date: visualizacoes[i]._id.date, count: visualizacoes[i].count, food: visualizacoes[i]._id.food});
    }
    // let map = new Map(Array.from(result, obj => [obj["date"], []]));

    // result.forEach(obj => map.get(obj["date"]).push(obj));
    return Array.from(result);
  }

  async getByMonthAllTable(restaurant: string, month: any = 0, year: any = 0, limit: any = 5){
    console.log('dentro')
    const data = new Date();
    month = month==0 ? data.getMonth()+1 : parseInt(month);
    year = year==0 ? data.getFullYear() : parseInt(year);
    const visualizacoes = await this.SaleModel.aggregate([
      {$match: {
        $and: [    
        { $expr: {$eq: [{$month: "$date"}, month]} },
        { $expr: {$eq: [{$year: "$date"}, year]} },
        { restaurant: new mongoose.Types.ObjectId(restaurant) }
      ]
      }
    },
      {$group : {_id: { table: "$table" }, count:{$sum: "$price"}}},
      { $sort : { count : -1 } },
      { $limit : limit }  
    ])      
   
    let result = []
    for (let i = 0; i < visualizacoes.length; i++) {
      result.push({date: visualizacoes[i]._id.date, count: visualizacoes[i].count, table: visualizacoes[i]._id.table});
    }
    // let map = new Map(Array.from(result, obj => [obj["date"], []]));

    // result.forEach(obj => map.get(obj["date"]).push(obj));
    return Array.from(result);
  }
}
