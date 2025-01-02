import { Test, TestingModule } from '@nestjs/testing';
import { OrderTablesService } from './order-tables.service';

describe('OrderTablesService', () => {
  let service: OrderTablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTablesService],
    }).compile();

    service = module.get<OrderTablesService>(OrderTablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
