import { sendSms } from './../utils/sendSms';
import { emailConfirmLink } from './../utils/emailConfirmLink';
import { sendEmail, sendPassword, sendChangePassword } from './../utils/sendEmail';
import { AdmUsersController } from './../adm-users/adm-users.controller';
import { CreateAdmUserDto } from './../adm-users/dto/create-adm-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdmUsersService } from 'src/adm-users/adm-users.service';
import { JwtAuthGuard } from './../auth/shared/jwt-auth.guard';
import { CreateEmployeeUserDto } from 'src/employee-users/dto/create-employee-user.dto';
import { EmployeeUsersService } from 'src/employee-users/employee-users.service';
import { createCode } from 'src/utils/bcrypt';

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService, 
    private readonly employeeUsersService: EmployeeUsersService,
    private readonly admUsersService: AdmUsersService) {}

  @Post()
  async create(@Body() createUserDto: any) {
    
    const result = await this.usersService.create(createUserDto);
    if (createUserDto.category === 'adm'){
      const dados: CreateAdmUserDto = {
        user: result._id,
        plano: "teste"
      }
      await this.admUsersService.create(dados);
    }
    else if (createUserDto.category === 'funcionario'){
      const dadosEmployee: CreateEmployeeUserDto = {
        user: result._id,
        userBoss: createUserDto.userBoss,
        restaurant: createUserDto.restaurant,
        cargo: createUserDto.cargo,
        horaEntrada: createUserDto.horaEntrada,
        horaSaida: createUserDto.horaSaida,
        semana: createUserDto.semana,
        status: createUserDto.status,
        permissao: createUserDto.permissao
      }
      await this.employeeUsersService.create(dadosEmployee);
    }
    await sendEmail(result.email);
    return true;
  }

  @Post("/cliente")
  async createCliente(@Body() createUserDto: any) {
    const temEmail: any = await this.usersService.findByEmail(createUserDto.email);
    const codeGerado = createCode()
    createUserDto.password = codeGerado
    if (temEmail){
      await this.usersService.update(temEmail._id, createUserDto);

    }
    else{
      const result = await this.usersService.create(createUserDto);

    }
    await sendPassword(createUserDto.email, codeGerado);

    return true;
  }

  @Post('/forget-password')
  async forgetPassword(@Body('email') email: string) {
    console.log(email)
    const temEmail: any = await this.usersService.findByEmail(email);
    console.log(temEmail);
    if (temEmail){
      const result = await this.usersService.geraCode(temEmail._id);
      console.log(result)
      await sendPassword(email, result);
      return true;
    }
    return false;

  }
  @Post('/compare-password')
  async comparePassword(@Body('email') email: string, @Body('code') code: string) {

    const temEmail: any = await this.usersService.findByEmail(email);

    if (temEmail){
      const result = await this.usersService.verificaCode(temEmail._id, code);
      console.log(result)
      // await sendPassword(email, result);
      if (result){
        return result._id;

      }
      else{
        return false;
      }
    }
    return false;

  }

  @Post('/change-password')
  async changePassword(@Body('email') email: string, @Body('code') code: string, @Body('password') password: string) {

    const temEmail: any = await this.usersService.findByEmail(email);

    if (temEmail){
      const result = await this.usersService.verificaCode(temEmail._id, code);
      console.log(result)
      // await sendPassword(email, result);
      if (result){
        const userDto: UpdateUserDto = {
          password: password
        }
        await this.usersService.update(result._id, userDto);
        await sendChangePassword(email);
        return true;
      }
      else{
        return false;
      }
    }
    return false;

  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('email/:tipo/:email')
  async findOneEmail(@Param('email') email: string, @Param('tipo') tipo: string) {
    const result = await this.usersService.findByEmail(email);

    if (result && result.category === tipo){
      return false;
    }
    return true;
  }


  @Post('loginCliente')
  async login(@Body() createUserDto: any) {
    const codeGerado = createCode()
    createUserDto.password = codeGerado
    if (createUserDto.email){
      const temEmail = await this.usersService.findByEmail(createUserDto.email);
      if (temEmail){

        await this.usersService.updatePassword(temEmail._id, codeGerado);
        await sendPassword(createUserDto.email, "Seu código para Login: "+codeGerado);
        return {status: true}
      }

    }  
    else{
      const temTelefone = await this.usersService.findByTelefone(createUserDto.telefone);
      if (temTelefone){

        await this.usersService.updatePassword(temTelefone._id, codeGerado);
        console.log(createUserDto.telefone)
        await sendSms(createUserDto.telefone, "Seu código para Login: "+codeGerado);
        return {status: true}
      }
      
    } 
    return {status: false}
   
  }
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id)
    return this.usersService.findOne(id);
  }


  @Get('numero/telefone')
  mandMsg(@Param('id') id: string) {
    sendSms('teste', "teste");
  }


  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}


