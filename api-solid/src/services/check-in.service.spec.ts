import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInService } from './check-in.service';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe('Authentication Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    await sut.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    await expect(() =>
      sut.checkIn({
        user_id: 'user-01',
        gym_id: 'gym-01',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    await sut.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
