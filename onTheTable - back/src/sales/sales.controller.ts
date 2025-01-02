import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto, @Body() updateSaleDto: UpdateSaleDto) {
    let result: any = await this.salesService.isExist(createSaleDto.food, createSaleDto.table, createSaleDto.date);
    if (result){
      result.quantidade = result.quantidade + createSaleDto.quantidade;
      result.price = result.price + createSaleDto.price;
      console.log(createSaleDto.quantidade, result.quantidade)
      return this.salesService.update(result._id, result,);

    }
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }

  @Get("foods/:idRestaurant")
  getByDateFood(
    @Param('idRestaurant') id: string, 
    @Query('month') month: number = 0, 
    @Query('year')  year: number = 0, 
    @Query('day')  day: number = 0, 
    @Query('allMonth') allMonth: string = "false",
    @Query('limit')  limit: any = 5, 
    ){
    console.log("aqui", month, year, allMonth, day)
    limit = parseInt(limit)
    if (allMonth == "true") return this.salesService.getByMonthAllFood(id, month, year, limit)

    return this.salesService.getByDateAllFood(id, month, year, day, limit)
  }
  @Get("tables/:idRestaurant")
  getByDateTable(
    @Param('idRestaurant') id: string, 
    @Query('month') month: number = 0, 
    @Query('year')  year: number = 0, 
    @Query('day')  day: number = 0, 
    @Query('allMonth') allMonth: string = "false",
    @Query('limit')  limit: any = 5, ){
    console.log("aqui")
    limit = parseInt(limit)
    if (allMonth == "true") return this.salesService.getByMonthAllTable(id, month, year)

    return this.salesService.getByDateAllTable(id, month, year, day, limit)


  }
}
