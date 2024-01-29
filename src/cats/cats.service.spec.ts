import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

describe('CatsService', () => {
  let service: CatsService;
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => { 
    expect(service).toBeDefined();
  });

  // describe('')
});
