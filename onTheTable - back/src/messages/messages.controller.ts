import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }
  @Get('byMesas/:id')
  findMessagesMesa(@Param('id') id: string) {
    return this.messagesService.findMessagesMesa(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }
  @Patch('enviar/:id')
  async sendMessages(@Param('id') id: string, @Body() message: any) {
    let result: any = await this.messagesService.findOne(id);
    result.msg.push(message.msg);
    result.usuarioLido = message.usuarioLido;
    result.restauranteLido = message.restauranteLido;
    return this.messagesService.update(id, result);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
