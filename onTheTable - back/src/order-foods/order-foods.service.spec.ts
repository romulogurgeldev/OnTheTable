import { Test, TestingModule } from '@nestjs/testing';
import { OrderFoodsService } from './order-foods.service';

describe('OrderFoodsService', () => {
  let service: OrderFoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderFoodsService],
    }).compile();

    service = module.get<OrderFoodsService>(OrderFoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
