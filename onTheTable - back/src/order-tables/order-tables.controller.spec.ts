import { Test, TestingModule } from '@nestjs/testing';
import { OrderTablesController } from './order-tables.controller';
import { OrderTablesService } from './order-tables.service';

describe('OrderTablesController', () => {
  let controller: OrderTablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTablesController],
      providers: [OrderTablesService],
    }).compile();

    controller = module.get<OrderTablesController>(OrderTablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
