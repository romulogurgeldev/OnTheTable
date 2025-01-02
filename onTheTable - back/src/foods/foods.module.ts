import { UploadModule } from './../utils/uploadFiles/upload.module';
import { Food, FoodSchema } from './entities/food.entity';
import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]), UploadModule],

  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService]
})
export class FoodsModule {}
