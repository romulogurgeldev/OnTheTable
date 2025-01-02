import { UploadService } from './../utils/uploadFiles/upload.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService, private readonly uploadServices: UploadService) {}
  @Get("restaurant/:id")
  findAllByRestaurant(@Param('id') id: string) {
    return this.foodsService.findAllByRestaurant(id);
  }
  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Get(":limit/:page")
  findAll(@Param('limit') limit: number, @Param('page') page: number) {
    return this.foodsService.findAll(limit, page);
  }


  
  @Get('category/:id/:limit/:page/:ordem/:title')
  findAllByCategory(@Param('id') id: string, @Param('limit') limit: number, @Param('page') page: number, 
  @Param('ordem') ordem: number, @Param('title') title: string) {
    if(ordem && title){
    return this.foodsService.findAllByCategory(id, limit, page, ordem, title);

    }
    return this.foodsService.findAllByCategory(id, limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result: any =  await this.foodsService.findOne(id);
    console.log(result)
    const resultDelete = await this.uploadServices.delete(result.image.key);
    return this.foodsService.remove(id);
  }
}
