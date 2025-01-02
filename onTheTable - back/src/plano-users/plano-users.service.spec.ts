import { Test, TestingModule } from '@nestjs/testing';
import { PlanoUsersService } from './plano-users.service';

describe('PlanoUsersService', () => {
  let service: PlanoUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanoUsersService],
    }).compile();

    service = module.get<PlanoUsersService>(PlanoUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
