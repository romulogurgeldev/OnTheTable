import { Test, TestingModule } from '@nestjs/testing';
import { OrderFoodsController } from './order-foods.controller';
import { OrderFoodsService } from './order-foods.service';

describe('OrderFoodsController', () => {
  let controller: OrderFoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderFoodsController],
      providers: [OrderFoodsService],
    }).compile();

    controller = module.get<OrderFoodsController>(OrderFoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
