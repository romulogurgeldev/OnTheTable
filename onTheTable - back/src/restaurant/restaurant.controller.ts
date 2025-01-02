import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from './../auth/shared/jwt-auth.guard';
import { CategoriesService } from 'src/categories/categories.service';
import { TablesService } from 'src/tables/tables.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly categoriesService: CategoriesService,
    private readonly tablesService: TablesService) {}

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    
    const result = await this.restaurantService.create(createRestaurantDto);
    let categoria: any = {
      name: "Balcão",
      restaurant: result._id,
      type: "mesa",
    };

    const resultCategory = await this.categoriesService.create(categoria)

    let table: any = {
      restaurant: result._id,
      category: resultCategory._id,
      name: "Balcão",
      qrCode: "sem img",
      size: "1",
      status: true,
      chegada: null,
      reserved: false,
      reservations: null,
      icon: 'sem icone',
      url: "http://192.168.0.4:4401/#/mesa/",
      participantes: [],
      cart: [],
    };

    const resultTable = await this.tablesService.create(table);
    resultTable.url = resultTable.url+resultTable.code;
    return this.tablesService.update(result._id, result);

    return result;
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }
  @Get('pwa/public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.restaurantService.findOnePublic(id);
  }
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('adm/:id')
  findByAdm(@Param('id') id: string) {
    return this.restaurantService.findByAdm(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
