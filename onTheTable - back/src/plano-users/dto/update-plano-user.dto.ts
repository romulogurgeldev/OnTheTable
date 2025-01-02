import { PartialType } from '@nestjs/swagger';
import { CreatePlanoUserDto } from './create-plano-user.dto';

export class UpdatePlanoUserDto extends PartialType(CreatePlanoUserDto) {}
