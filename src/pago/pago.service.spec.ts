import { Test, TestingModule } from '@nestjs/testing';
import { PagoService } from './pago.service';
import { beforeEach, describe, it } from 'node:test';

describe('PagoService', () => {
  let service: PagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagoService],
    }).compile();

    service = module.get<PagoService>(PagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
