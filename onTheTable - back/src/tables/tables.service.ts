import { ClienteMesa } from '../Class/clienteMesa/clienteMesa';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table, TableDocument } from './entities/table.entity';
import { createCode } from 'src/utils/bcrypt';

@Injectable()
export class TablesService {
  constructor(@InjectModel(Table.name) private TableModel: Model<TableDocument>) {}
  create(createTableDto: CreateTableDto) {
    createTableDto.code = createCode()
    const Table = new this.TableModel(createTableDto);
    return Table.save();
  }

  findAll(limit: number, page: number) {
    return this.TableModel.find().populate({
      path: 'category',
    }).skip(page).limit(limit).exec();

  }
  findAllByCategory(id: string, limit: number, page: number, ordem: number = -1, title = "name") {
    const sorts = {[title]: ordem}
    return this.TableModel.find(
      { category : { $in : [id] }}
    ).skip(page).populate({
      path: 'category',
    }).limit(limit).sort(sorts).exec();

    

  }
  findAllByCategoryNoPage(id: string) {

    return this.TableModel.find(
      { category : { $in : [id] }}
    ).exec();

    

  }
  findAllByRestaurant(id: string, limit: number, page: number, ordem: number = -1, title = "name") {
    const sorts = {[title]: ordem}
    return this.TableModel.find(
      { restaurant : { $in : [id] }}
    ).populate({
      path: 'category',
    }).skip(page).limit(limit).sort(sorts).exec();

    

  }
  async findParticipante(id: string, user: string) {
    const result: any = await this.TableModel.findById(id).exec();
    console.log(result)
    let item;
    for (item of result.participantes) {
      if(item.user == user){
        console.log(item.user, user)

        return {result: true, msg: "usuário esta na mesa"}
      }
    }
    return {result: false, msg: "usuário não esta na mesa"}

   

    

  }

  async findOne(id: string) {
    return await this.TableModel.findById(id).populate({
      path: 'restaurant', select: ['name', '_id']
    });
  }
  findOneByCode(code: string) {
    return this.TableModel.findOne({code}).populate({
      path: 'restaurant', select: ['name', '_id']
    }).exec();
  }

  update(id: string, updateTableDto: UpdateTableDto) {
    return this.TableModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...updateTableDto
    },
    {
      new: true
    }
    
    );
  }
  async checkin(id: string, newParticipante: any) {

    let result: CreateTableDto = await this.TableModel.findById(id);
    result.participantes.push(newParticipante)

    const checking: UpdateTableDto = {
      chegada: newParticipante.chegada,
      participantes: result.participantes,
    }
    console.log("checkin", checking)
    return this.TableModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...checking
    },
    {
      new: true
    }
    
    );
  }
  async cart(id: string, newProduto: any) {

    let result: CreateTableDto = await this.TableModel.findById(id);
    result.cart.push(newProduto)

    const cart: UpdateTableDto = {
      cart: result.cart
    }

    return this.TableModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...cart
    },
    {
      new: true
    }
    
    );
  }
  async RemoveCart(id: string, index: number) {

    let result: CreateTableDto = await this.TableModel.findById(id);
    
    result.cart.splice(index, 1);
    const cart: UpdateTableDto = {
      cart: result.cart
    }

    return this.TableModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...cart
    },
    {
      new: true
    }
    
    );
  }
  async EditCart(id: string, index: number, valor: number) {

    let result: CreateTableDto = await this.TableModel.findById(id);
    
    result.cart[index].quantidade = (result.cart[index].quantidade) + (valor);
    const cart: UpdateTableDto = {
      cart: result.cart
    }

    return this.TableModel.findByIdAndUpdate({
      _id: id
    },
    {
      ...cart
    },
    {
      new: true
    }
    
    );
  }

  remove(id: string) {
    return this.TableModel.deleteOne({
      _id:id,
    }).exec();
  }
  removeByRestaurant(id: string) {
    return this.TableModel.deleteMany({restaurant: id})

  }
}
