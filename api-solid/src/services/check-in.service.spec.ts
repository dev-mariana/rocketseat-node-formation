import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInService } from './check-in.service';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe('Authentication Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInsRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
