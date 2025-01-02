import { Test, TestingModule } from '@nestjs/testing';
import { PlanoUsersController } from './plano-users.controller';
import { PlanoUsersService } from './plano-users.service';

describe('PlanoUsersController', () => {
  let controller: PlanoUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanoUsersController],
      providers: [PlanoUsersService],
    }).compile();

    controller = module.get<PlanoUsersController>(PlanoUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
