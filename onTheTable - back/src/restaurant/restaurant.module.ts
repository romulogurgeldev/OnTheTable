import { CategoriesModule } from './../categories/categories.module';
import { TablesModule } from './../tables/tables.module';
import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant, RestaurantSchema } from './entities/restaurant.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]), TablesModule, CategoriesModule],
  controllers: [RestaurantController],
  providers: [RestaurantService]
})
export class RestaurantModule {}
