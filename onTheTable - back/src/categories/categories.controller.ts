import { FoodsService } from './../foods/foods.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TablesService } from 'src/tables/tables.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService, 
    private readonly foodsService: FoodsService,
    private readonly tablesService: TablesService
    ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get(":limit/:page")
  findAll(@Param('limit') limit: number, @Param('page') page: number) {
    return this.categoriesService.findAll(limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }
  @Get('restaurant/:tipo/:id/:limit/:page')
  findAllByRestaurant(@Param('id') id: string, @Param('tipo') tipo: string, @Param('limit') limit: number, @Param('page') page: number) {
    return this.categoriesService.findAllByCategory(id, tipo, limit, page);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result: any = await this.categoriesService.findOne(id);
    if (result.type == "comida"){
      
      const resultFood = await this.foodsService.findAllByCategoryNoPage(id);
      for (const item of resultFood) {
        console.log(item)
        await this.foodsService.remove(item._id);
      }
    }
    else if (result.type == "mesa"){
            
      const resultTable= await this.tablesService.findAllByCategoryNoPage(id);
      let item: any;
      for ( item of resultTable) {
        console.log(item)
        await this.tablesService.remove(item._id);
      }
    }
    console.log(result)
    return this.categoriesService.remove(id);
  }
}
