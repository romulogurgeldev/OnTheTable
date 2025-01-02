import { PartialType } from '@nestjs/swagger';
import { CreateAtributosComidaDto } from './create-atributos-comida.dto';

export class UpdateAtributosComidaDto extends PartialType(CreateAtributosComidaDto) {}
