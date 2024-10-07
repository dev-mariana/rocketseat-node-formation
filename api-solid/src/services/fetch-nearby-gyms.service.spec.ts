import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsService } from './fetch-nearby-gyms.service';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.9284506,
      longitude: -43.1816704,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -23.0026692,
      longitude: -43.3170944,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.0026692,
      userLongitude: -43.3170944,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Far Gym' })]);
  });
});
