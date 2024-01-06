import { Test, TestingModule } from '@nestjs/testing';
import { HireJobController } from './hire-job.controller';
import { HireJobService } from './hire-job.service';

describe('HireJobController', () => {
  let controller: HireJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HireJobController],
      providers: [HireJobService],
    }).compile();

    controller = module.get<HireJobController>(HireJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
