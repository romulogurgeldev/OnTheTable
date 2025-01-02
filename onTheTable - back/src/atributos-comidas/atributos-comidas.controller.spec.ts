import { Test, TestingModule } from '@nestjs/testing';
import { AtributosComidasController } from './atributos-comidas.controller';
import { AtributosComidasService } from './atributos-comidas.service';

describe('AtributosComidasController', () => {
  let controller: AtributosComidasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtributosComidasController],
      providers: [AtributosComidasService],
    }).compile();

    controller = module.get<AtributosComidasController>(AtributosComidasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
