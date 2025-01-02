import { Injectable } from '@nestjs/common';
import { CreateClientUserDto } from './dto/create-client-user.dto';
import { UpdateClientUserDto } from './dto/update-client-user.dto';

@Injectable()
export class ClientUsersService {
  create(createClientUserDto: CreateClientUserDto) {
    return 'This action adds a new clientUser';
  }

  findAll() {
    return `This action returns all clientUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientUser`;
  }

  update(id: number, updateClientUserDto: UpdateClientUserDto) {
    return `This action updates a #${id} clientUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientUser`;
  }
}
