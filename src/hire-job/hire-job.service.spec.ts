import { Test, TestingModule } from '@nestjs/testing';
import { HireJobService } from './hire-job.service';

describe('HireJobService', () => {
  let service: HireJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HireJobService],
    }).compile();

    service = module.get<HireJobService>(HireJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
