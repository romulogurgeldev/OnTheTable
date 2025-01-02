import { Test, TestingModule } from '@nestjs/testing';
import { ClientUsersController } from './client-users.controller';
import { ClientUsersService } from './client-users.service';

describe('ClientUsersController', () => {
  let controller: ClientUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientUsersController],
      providers: [ClientUsersService],
    }).compile();

    controller = module.get<ClientUsersController>(ClientUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
