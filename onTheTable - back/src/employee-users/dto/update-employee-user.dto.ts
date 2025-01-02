import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeUserDto } from './create-employee-user.dto';

export class UpdateEmployeeUserDto extends PartialType(CreateEmployeeUserDto) {}
