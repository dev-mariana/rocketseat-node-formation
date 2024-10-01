import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInService } from './check-in.service';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe('Authentication Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.9284506,
      longitude: -43.1816704,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
      user_latitude: -22.9284506,
      user_longitude: -43.1816704,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    await sut.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
      user_latitude: -22.9284506,
      user_longitude: -43.1816704,
    });

    await expect(() =>
      sut.checkIn({
        user_id: 'user-01',
        gym_id: 'gym-01',
        user_latitude: -22.9284506,
        user_longitude: -43.1816704,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should not be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    await sut.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
      user_latitude: -22.9284506,
      user_longitude: -43.1816704,
    });

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
      user_latitude: -22.9284506,
      user_longitude: -43.1816704,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should notbe able to check in on distant gym', async () => {
    await gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.9128908),
      longitude: new Decimal(-43.1818104),
    });

    await expect(() =>
      sut.checkIn({
        user_id: 'user-01',
        gym_id: 'gym-02',
        user_latitude: -22.9284506,
        user_longitude: -43.1816704,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
