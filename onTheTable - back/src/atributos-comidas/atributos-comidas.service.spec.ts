import { Test, TestingModule } from '@nestjs/testing';
import { AtributosComidasService } from './atributos-comidas.service';

describe('AtributosComidasService', () => {
  let service: AtributosComidasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtributosComidasService],
    }).compile();

    service = module.get<AtributosComidasService>(AtributosComidasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
