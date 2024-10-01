import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymService } from './create-gym.service';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe('Create Gym Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await sut.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.9284506,
      longitude: -43.1816704,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
