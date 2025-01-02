import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeUsersService } from './employee-users.service';

describe('EmployeeUsersService', () => {
  let service: EmployeeUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeUsersService],
    }).compile();

    service = module.get<EmployeeUsersService>(EmployeeUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
