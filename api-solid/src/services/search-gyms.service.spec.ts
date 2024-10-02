import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchGymsService } from './search-gyms.service';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.9284506,
      longitude: -43.1816704,
    });

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -22.9284506,
      longitude: -43.1816704,
    });

    const { gyms } = await sut.search({
      query: 'JavaScript',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ]);
  });

  it('should be able to fetch pagineted gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.9284506,
        longitude: -43.1816704,
      });
    }

    const { gyms } = await sut.search({
      query: 'JavaScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ]);
  });
});
