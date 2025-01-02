import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeUsersController } from './employee-users.controller';
import { EmployeeUsersService } from './employee-users.service';

describe('EmployeeUsersController', () => {
  let controller: EmployeeUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeUsersController],
      providers: [EmployeeUsersService],
    }).compile();

    controller = module.get<EmployeeUsersController>(EmployeeUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
